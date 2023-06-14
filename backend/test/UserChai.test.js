import chai from 'chai'
import mongoose from 'mongoose'
import { userModel } from '../src/models/MongoDB/userModel.js'
import "dotenv/config.js";

await mongoose.connect(process.env.URLMONGODB)

const expect = chai.expect

describe("Test con chai para users", ()=>{

    before( function () {
        console.log("Comenzando test con chai");
    })

    beforeEach(function(){
        this.timeout(5000)
    })

    it("Consultar todos los usuarios de la BDD con chai", async function(){
        const users = await userModel.find()
        expect(users).to.not.be.deep.equal([])
    })
})