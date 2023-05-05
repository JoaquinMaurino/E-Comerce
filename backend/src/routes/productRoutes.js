import {Router} from 'express'
import { getProducts } from '../controllers/productController.js'

const routerProduct = Router()

routerProduct.get('/', getProducts)

export default routerProduct;