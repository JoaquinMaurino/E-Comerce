import mercadopago from 'mercadopago'

export const createOrder = async (req, res)=>{
    mercadopago.configure({
        access_token: "TEST-7424419271623201-060610-16bb135bef2069767c747993c1e964f5-1392553904"
    })
    try {
       const result = await mercadopago.preferences.create({
            items:[
                {
                    title: "Laptop",
                    unit_price: 500,
                    currency_id: "ARS",
                    quantity: 1
                }
            ],
            back_urls: {
                success: "",
                failure: ""
            }
        })
        console.log(result);
        res.status(200).send({message: "Order created"})
    } catch (error) {
        res.status(500).send({message: error})
    }
}

export const paymentSuccess = async (req, res)=>{
    try {
        res.status(200).send({message: "Payment done"})
    } catch (error) {
        res.status(500).send({message: error})
        
    }
}
export const paymentFailure = async (req, res)=>{
    try {
        res.status(200).send({message: "Fail"})
    } catch (error) {
        res.status(500).send({message: error})
        
    }
}