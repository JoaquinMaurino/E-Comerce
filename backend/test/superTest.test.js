import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import "dotenv/config.js";

await mongoose.connect(process.env.URLMONGODB);

const expect = chai.expect;

const requester = supertest("http://localhost:5000");

describe("Testing de la aplicacion", () => {
  //Testing de Products:
/*     describe("Testing de las rutas de Product", () => {

    //POST
    it("Ruta: product con el metodo POST", async function () {
      //_body, StatusCode, Ok(true or false)
      const newProduct = {
        title: "IphoneX",
        description: "Smartphone",
        code: "AB37D4",
        price: 75000,
        status: true,
        stock: 30,
        category: "Mobilephone",
        thumbnails: [],
      };
      const { statusCode, _body, ok } = await requester
        .post("/product")
        .send(newProduct); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });

    //PUT
    it("Ruta: product con el metodo PUT", async function () {
      const id = "649063a5124b1e2e4fac407e";
      const updatedProduct= {
        title: "IphoneX",
        description: "Smartphone",
        code: "AB37D4",
        price: 82000,
        status: false,
        stock: 5,
        category: "Mobilephone",
        thumbnails: [],
      };
      const { statusCode, _body, ok } = await requester
        .put(`/product/${id}`)
        .send(updatedProduct); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });

    //DELETE
    it("Ruta: product con el metodo DELETE", async function () {
      const id = "649063a5124b1e2e4fac407e";
      const { statusCode, _body, ok } = await requester
        .delete(`/product/${id}`)
        .send(); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });

    //GET
    it("Ruta: product con el metodo GET", async function () {
      const { statusCode, _body, ok } = await requester.get("/product").send(); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });
  }); */

  //Testing de sessions:
  describe("testing de la ruta de sessions", ()=>{

/*     //REGISTER
    it("Ruta: session/register con el metodo POST", async function(){
        const newUser = {
            first_name: "Joaquin",
            last_name: "Mauriño",
            age: 23,
            email: "joaquin9918@gmail.com",
            password: "Crossfit",
          };
        const {_body} = await requester.post("/session/register").send(newUser) 
        console.log(_body);
        expect(_body).to.be.ok //analizar si el status es 200

    }); */

    //LOGIN
    it("Ruta: session/login con el metodo POST", async function(){
        const newUser = {
            email: "joaquin9918@gmail.com",
            password: "Crossfit",
          };
          const { statusCode, _body, ok } = await requester.post("/session/login").send(newUser)
          console.log(statusCode);
          console.log(_body);
          console.log(ok);
    });

    //CURRENT
    it("Ruta: session/current con el metodo GET", async function(){
      const { statusCode, _body, ok } = await requester.get("/session/current").send()
        console.log(statusCode);
        console.log(_body);
        console.log(ok);

    })
  });
  })
