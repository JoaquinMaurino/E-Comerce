import {productModel} from '../models/MongoDB/productModel.js'

export const createProduct = async (product) => {
    try {
      const newProduct = await productModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  };

  export const findProducts = async ()=>{
    try {
      return await productModel.find()
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const findProductsPaginate = async (filter, options) => {
    try {
      return  await productModel.paginate(filter, options)
    } catch (error) {
      throw new Error(error);
    }
  };

  export const findProductById = async (id) => {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const updateProduct = async (id, data)=>{
      try {
          return await productModel.findByIdAndUpdate(id, data)
      } catch (error) {
          throw new Error(error)
      }
  };
  
  export const deleteProduct = async (id)=>{
      try {
          return await productModel.findByIdAndDelete(id)
      } catch (error) {
          throw new Error(error)
      }
  };