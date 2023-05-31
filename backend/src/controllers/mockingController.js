import { faker } from "@faker-js/faker";

const createFakeProduct = () => {
  return {
    productId: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.sample(6),
    price: faker.commerce.price({min: 50, max: 10000, symbol: "$"}),
    status: faker.datatype.boolean(),
    stock: faker.number.int({ min: 0, max: 999, precision: 1 }),
    category: faker.commerce.department(),
    thumbnails: faker.image.url(),
  };
};

export const getFakeProducts = async (req, res) => {
  const fakerProds = [];
  try {
    for (let index = 0; index < 100; index++) {
        fakerProds.push(createFakeProduct())
    }
    res.status(200).send({fakerProds})
  } catch (error) {
    res.status(500).send(error);
  }
};
