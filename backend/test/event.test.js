const { expect } = require("chai");
var request = require('supertest');
var app = require('../src/index.js');


describe("Event Service Unit Tests", function () {
    describe("Get Event by id", function () {
      it("should successfully get an event by id", async function () {
        const id = 5;
        const response = await request(app)
          .get(`/event/byId/${id}`)
          .set('Accept', 'application/json');
          expect(response.status).equals(200);
          expect(response.body.event_id).equals(5);
          //console.log(response.body);
      });
      it("should return No Event message if no event found", async function () {
      });
    });
    describe("Get list of all Events", function () {
      it("should successfully get an event by id", async function () {
        const id = 5;
        const response = await request(app)
          .get(`/event/byId/${id}`)
          .set('Accept', 'application/json');
          expect(response.status).equals(200);
          expect(response.body.event_id).equals(5);
          //console.log(response.body);
      });
      it("should return No Event message if no event found", async function () {
      });
    });
  });