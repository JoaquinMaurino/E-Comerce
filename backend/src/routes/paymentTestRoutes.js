import {Router} from 'express'
import { createOrder, paymentFailure, paymentSuccess } from '../controllers/paymentController.js'

const routerPayment = Router()

routerPayment.get("/create-order", createOrder)
routerPayment.get("/success", paymentSuccess)
routerPayment.get("/failure", paymentFailure)

export default routerPayment

