const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("User Account Service Unit Tests", async function () {
  const response = await request(app)
  .post(`/login`)
    .send({
      emailAddress: "test_email@email.com",
      password: "test_password"
    });
    const authToken = response.body.token;
    describe("Get All Info for a Particular User", function () {
      it("should successfully get all info for a particular user", async function () {
        const id = 17;
        const response = await request(app)
        .get(`/useraccount/byId/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.user_account_id).equals(17);
        expect(response.body.first_name).equals("Jonny");
        expect(response.body.last_name).equals("Johnston");
        expect(response.body.email_address).equals("jonnyboy@outlook.com");
      });
      it("should return No User message if no user found", async function () {
        const id = 1;
        const response = await request(app)
        .get(`/useraccount/byId/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"No users"});
      });
    });

    describe("Update User Bio", function () {
      it("should successfully update user bio", async function () {
        const id = 17;
        const userBio = "bio change test";
        const response = await request(app)
          .post(`/useraccount/updatebio/${id}`)
          .set('accessToken', authToken);
          expect(response.status).equals(200);
          expect(response.body.message).equals("success");
      it("should return error message if can't update bio", async function () {
          const id = 1;
          const response = await request(app)
          .post(`/useraccount/updatebio/${id}`)
          .set('accessToken', authToken);
          expect(response.status).equals(200);
          expect(response.body).to.deep.equal({message:"Can't update bio"});
      });
    });
  });

  describe("Update User First and Last Name", function () {
    it("should successfully update user's name", async function () {
      const id = 40;
      const updatedFirstName = "Ronald";
      const updatedLastName = "Grint";
      const response = await request(app)
        .post(`/useraccount/changename/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.message).equals("success");
   /* it("should return error message if can't update name", async function () {
        const id = 1;
        const response = await request(app)
        .post(`/useraccount/updatebio/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"Can't update bio"});
    });*/
  });
});


});
