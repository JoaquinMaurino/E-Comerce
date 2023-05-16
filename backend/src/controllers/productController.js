import {
  createProduct,
  findProductsPaginate,
  findProductById,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    let { limit, page, category, sort } = req.query;
    let filter = {};
    category ? (filter.category = category) : filter;
    const options = {
      limit: limit ? parseInt(limit) : 10,
      page: page ? parseInt(page) : 1,
      sort: { price: sort == "asc" ? 1 : -1 },
    };
    const products = await findProductsPaginate(filter, options);

    const catLink = category ? `&category=${category}` : "";
    const limitLink = limit ? `&limit=${limit}` : "";
    const sortLink = sort ? `&sort=${sort}` : "";
    const prevPageLink = products.hasPrevPage
      ? `/products?page=${products.prevPage}${catLink}${limitLink}${sortLink}`
      : "";
    const nextPageLink = products.hasNextPage
      ? `/products?page=${products.nextPage}${catLink}${limitLink}${sortLink}`
      : "";

    const productsPaginate = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: prevPageLink,
      nextLink: nextPageLink,
    };
    res.status(200).json(productsPaginate);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await findProductById(req.params.pId);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(200).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await updateProduct(req.params.pId, req.body);
    res.status(200).send(`Product updated successfully: ${product}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    await deleteProduct(req.params.pId);
    res.status(200).send(`Product deleted successfully`);
  } catch (error) {
    res.status(500).send(error);
  }
};
