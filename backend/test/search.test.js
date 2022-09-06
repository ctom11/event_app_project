const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("Search Service Unit Tests", function () {
    describe("Get Search Results", function () {
      it("should successfully get search results", async function () {
        const response = await request(app)
        .get(`/search/mc`);
        expect(response.status).equals(200);
        expect(response.body.length).equals(2);
        expect(response.body[0].event_name).equals("Joanne McNally - The Prosecco Express");
        expect(response.body[0].event_date).equals("2022-10-14");
        expect(response.body[0].event_time).equals("8pm");
        expect(response.body[0].event_img).equals("JoanneMcNally_HR_1-min-1125x1125.jpg");
        expect(response.body[0].event_location).equals("SSE Arena Belfast");
        expect(response.body[0].event_id).equals(5);
        expect(response.body[0].genre_name).equals("Comedy");

        expect(response.body[1].event_name).equals("Kevin McAleer Live at Mandela");
        expect(response.body[1].event_date).equals("2022-10-15");
        expect(response.body[1].event_time).equals("7pm");
        expect(response.body[1].event_img).equals("Media,1377487,smxx-800x420.jpg");
        expect(response.body[1].event_location).equals("Mandela Hall Belfast");
        expect(response.body[1].event_id).equals(9);
        expect(response.body[1].genre_name).equals("Comedy");
      })
      it("should return No Results if no search results found", async function () {
        const response = await request(app)
        .get(`/search/xyz`);
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"No search results"});
      });
    });
});
