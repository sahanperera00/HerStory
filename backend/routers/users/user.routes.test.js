import request from "supertest";
import router from "./user.routes.js";

describe("post/login",()=>{
    describe("Given a username and password",()=>{
        
        test("should respond with a 200 status code",async()=>{
            const response = await request(router).post("/login").send({
                "email":"devindu@gmail.com",
                "password":"devindu123"
            })
            expect(response.statusCode).toBe(200);
        })
    })
})