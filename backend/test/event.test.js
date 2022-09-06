const { expect } = require("chai");
var request = require('supertest');
const { response } = require("../src/index.js");
var app = require('../src/index.js');


describe("Event Service Unit Tests", function () {
    describe("Get Event by id", function () {
      it("should successfully get an event by id", async function () {
        const id = 5;
        const response = await request(app)
          .get(`/event/byId/${id}`);
          expect(response.status).equals(200);
          expect(response.body.event_id).equals(5);
          expect(response.body.event_name).equals("Joanne McNally - The Prosecco Express");
          expect(response.body.genre_id).equals(17);
          expect(response.body.event_date).equals("2022-10-14");
          expect(response.body.event_time).equals("8pm");
          expect(response.body.event_location).equals("SSE Arena Belfast");
      });
      it("should return No Event message if no event found", async function () {
          const id = 1;
          const response = await request(app)
          .get(`/event/byId/${id}`)
          expect(response.status).equals(200);
          expect(response.body).to.deep.equal({message:"No events found"});
      });
    });

   describe("Sort Events A-Z", function () {
      it("should successfully sort list of events from A-Z", async function () {
        const response = await request(app)
        .get(`/event/sortaz`);
        expect(response.body[0].event_name).equals("Andrea Bocelli");
        expect(response.body[1].event_name).equals("Belfast Championship Dog Show");
        expect(response.body[2].event_name).equals("Biffy Clyro");
        expect(response.body[3].event_name).equals("Christy Moore - Flying Into Mystery Live");
        expect(response.body[4].event_name).equals("Christy Moore - Flying Into Mystery Live");
        expect(response.body[5].event_name).equals("Clubland Halloween");
        expect(response.body[6].event_name).equals("Comic Con 2022 Belfast");
        expect(response.body[7].event_name).equals("Foraging on the Farm");
        expect(response.body[8].event_name).equals("Irish Vegan Festival");
        expect(response.body[9].event_name).equals("Joanne McNally - The Prosecco Express");
        expect(response.body[10].event_name).equals("Kevin McAleer Live at Mandela");
        expect(response.body[11].event_name).equals(`Nature Kid's Club at Broughgammon Farm`);
        expect(response.body[12].event_name).equals("Paddington 2 — Newcastle Community Cinema");
        expect(response.body[13].event_name).equals("Rock In The Mournes");
        expect(response.body[14].event_name).equals("Sarah Millican - Bobby Dazzler");
        expect(response.body[15].event_name).equals("Strand Arts Centre - EHOD 2022");
        expect(response.body[16].event_name).equals("Sunrise Yoga on Devenish Island Experience");
      });
    });

    describe("Sort Events by Date", function () {
      it("should successfully sort list of events by date", async function () {
        const response = await request(app)
        .get(`/event/sortdate`);
        expect(response.body[0].event_name).equals("Sunrise Yoga on Devenish Island Experience");
        expect(response.body[1].event_name).equals("Strand Arts Centre - EHOD 2022");
        expect(response.body[2].event_name).equals("Paddington 2 — Newcastle Community Cinema");
        expect(response.body[3].event_name).equals("Comic Con 2022 Belfast");
        expect(response.body[4].event_name).equals("Foraging on the Farm");
        expect(response.body[5].event_name).equals("Andrea Bocelli");
        expect(response.body[6].event_name).equals(`Nature Kid's Club at Broughgammon Farm`);
        expect(response.body[7].event_name).equals("Belfast Championship Dog Show");
        expect(response.body[8].event_name).equals("Christy Moore - Flying Into Mystery Live");
        expect(response.body[9].event_name).equals("Christy Moore - Flying Into Mystery Live");
        expect(response.body[10].event_name).equals("Rock In The Mournes");
        expect(response.body[11].event_name).equals("Joanne McNally - The Prosecco Express");
        expect(response.body[12].event_name).equals("Kevin McAleer Live at Mandela");
        expect(response.body[13].event_name).equals("Irish Vegan Festival");
        expect(response.body[14].event_name).equals("Clubland Halloween");
        expect(response.body[15].event_name).equals("Biffy Clyro");
        expect(response.body[16].event_name).equals("Sarah Millican - Bobby Dazzler");
      });
    });

    describe("Get Events in a Particular Genre", function () {
      it("should successfully get information for all events in a particular genre", async function () {
        const response = await request(app)
        .get(`/event/byGenre/17`);
        expect(response.body[0].event_name).equals("Joanne McNally - The Prosecco Express");
        expect(response.body[1].event_name).equals("Kevin McAleer Live at Mandela");
        expect(response.body[2].event_name).equals("Sarah Millican - Bobby Dazzler");
      });
    });

    describe("Get Free Events", function () {
      it("should successfully get information for all free events", async function () {
        const response = await request(app)
        .get(`/event/free`);
        expect(response.body[0].event_name).equals("Irish Vegan Festival");
      });
    });

    describe("Get Featured Events", function () {
      it("should successfully get information for all featured events", async function () {
        const response = await request(app)
        .get(`/event/featured`);
        expect(response.body[0].event_name).equals("Joanne McNally - The Prosecco Express");
        expect(response.body[1].event_name).equals("Kevin McAleer Live at Mandela");
        expect(response.body[2].event_name).equals("Sarah Millican - Bobby Dazzler");
        expect(response.body[3].event_name).equals(`Nature Kid's Club at Broughgammon Farm`);
        expect(response.body[4].event_name).equals("Sunrise Yoga on Devenish Island Experience");
        expect(response.body[5].event_name).equals("Strand Arts Centre - EHOD 2022");
      });
    });

  });