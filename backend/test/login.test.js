const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("Login Service Unit Tests", function () {
    describe("Log a user into their account", function () {
      it("should successfully log a user into their account", async function () {
        const response = await request(app)
        .post(`/login`)
            .send({
                emailAddress: "test_email@email.com",
                password: "test_password"
            })
        expect(response.status).equals(200);
        expect(response.body.token).to.exist;
        expect(response.body.id).equals(58);
      })
      it("should return login error message if login not possible", async function () {
        const response = await request(app)
        .post(`/login`)
          .send({
            emailAddress: "incorrect@email.com",
            password: "wrong"
      })
        expect(response.status).equals(401);
        expect(response.body).to.deep.equal({error: "Incorrect email"});
      });
    });
});
