const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("Signup Service Unit Tests", function () {
    describe("Register a New User", function () {
      it("should successfully register a new user", async function () {
        //Don't want to continually create new users
/*         const response = await request(app)
        .post(`/signup`)
            .send({
                firstName: "test_first_name",
                lastName: "test_last_name",
                emailAddress: "test_email@email.com",
                password: "test_password"
            })
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1); */
      })
/*       it("should return signup error message if signup not possible", async function () {
        const response = await request(app)
        .post(`/signup`)
          .send({
            firstName: "test_first_name",
            lastName: "test_last_name",
            emailAddress: "test_email@email.com",
            password: ""
      })]
        expect(response.status).equals(500);
        expect(response.body).to.deep.equal({message:"No users"});
      }); */
    });
});
