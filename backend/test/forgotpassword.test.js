const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("Forgot Password Service Unit Tests", function () {
    describe("Reset password", function () {
      it("should successfully reset password", async function () {
/*         const response = await request(app)
        .post(`/forgotpassword`)
            .send({
                emailId: "eventureprojecttest@gmail.com"
            })
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1); */
      })
       it("should return password reset error message if not possible", async function () {
/*         const response = await request(app)
        .post(`/forgotpassword`)
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({error: "Incorrect email"}); */
      }); 
    });
});
