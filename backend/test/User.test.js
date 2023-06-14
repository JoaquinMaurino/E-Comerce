import mongoose from 'mongoose'
import {userModel} from '../src/models/MongoDB/userModel.js'
import Assert from 'assert'
import "dotenv/config.js";


const assert = Assert.strict

await mongoose.connect(process.env.URLMONGODB)

describe("Test de consulta a todos los usuarios", ()=>{
    //Previo a arrancar todos los test
    before(function(){
       console.log("Comenzando test");
    })
    //Previo a arrancar un test
    beforeEach(function(){
        this.timeout(5000) //Por defecto viene en 2000
    })
    //Test propiamente dicho
    it("Test para obtener todos los usuarios de mi BDD", async function(){
        //Contexto propio del test (tengo un scope propio)
        const users = await userModel.find()
        assert.strictEqual(Array.isArray(users), true)
    })
    it("Test para crear un usuario en mi BDD", async function(){
        //Para este tipo de test se consulta a una BDD de Testing
        const newUser = {
            first_name:"Pepe",
            last_name:"Tester",
            age: 21,
            email: "testg@gmail.com",
            password: "123456"
        }
        const resultado = await userModel.create(newUser)
        assert.ok(resultado._id) // output => id || error/undefined
    })

    it("Eliminar usuario generado", async function(){
        const email = "testg@gmail.com"
        const user = await userModel.findOneAndDelete({email: email})
        assert.strictEqual(typeof user, 'object')
    })
})

