import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import "dotenv/config.js";

await mongoose.connect(process.env.URLMONGODB);

const expect = chai.expect;

const requester = supertest("http://localhost:5000");

describe("Testing de la aplicacion", () => {
    describe("Testing de las rutas de User", () => {
    //POST
    it("Ruta: user con el metodo POST", async function () {
      //_body, StatusCode, Ok(true or false)
      const newUser = {
        first_name: "Joaquin",
        last_name: "TEST",
        age: 5,
        email: "test@t.com",
        password: "123",
      };
      const { statusCode, _body, ok } = await requester
        .post("/user")
        .send(newUser); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });
    //PUT
    it("Ruta: user con el metodo PUT", async function () {
      const id = "6488fb5b486075ab9d76d437";
      const updateUser = {
        first_name: "Joaquin",
        last_name: "Test",
        age: 15,
        email: "test@t.com",
        password: "123456789",
      };

      const { statusCode, _body, ok } = await requester
        .put(`/user/${id}`)
        .send(updateUser); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });
    //DELETE
    it("Ruta: user con el metodo DELETE", async function () {
      const id = "6488fb5b486075ab9d76d437";
      const { statusCode, _body, ok } = await requester
        .delete(`/user/${id}`)
        .send(); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });
    //GET
    it("Ruta: user con el metodo GET", async function () {
      const { statusCode, _body, ok } = await requester.get("/user").send(); //requester.metodo(concatenacion de rutas)
      console.log(statusCode);
      console.log(_body);
      console.log(ok);
    });
  });

  //Testing de sessions
  describe("testing de la ruta de sessions", ()=>{
    let cookie = ""
    //REGISTER
    it("Ruta: session/register con el metodo POST", async function(){
        const newUser = {
            first_name: "Pedro",
            last_name: "Perez",
            age: 15,
            email: "enrique@test.com",
            password: "123456",
          };
        const {_body} = await requester.post("/session/register").send(newUser) 
        expect(_body).to.be.ok //analizar si el status es 200

    })
    //LOGIN
    it("Ruta: session/register con el metodo POST", async function(){
        const newUser = {
            email: "enrique@test.com",
            password: "123456",
          };
        const result = await requester.post("/session/login").send(newUser)
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok //verificar existencia de cookie

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        }
        expect(cookie.name).to.be.ok.and.equal('coderCookie')
        expect(cookie.value).to.be.ok
    })
    //CURRENT
    it("Ruta: session/current con el metodo GET", async function(){

        const {_body} = await requester.get("/session/current").set('Cookie', [`${cookie.name}=${cookie.value}`])
        console.log(_body.payload);
        expect(_body.payload).to.be.equal("enrique@test.com")

    })
  })
});
