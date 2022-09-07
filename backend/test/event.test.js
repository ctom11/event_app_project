const { expect } = require("chai");
var request = require('supertest');
var app = require('../src/index.js');


describe("Event Service Unit Tests", async function () {
  const response = await request(app)
        .post(`/login`)
            .send({
                emailAddress: "test_email@email.com",
                password: "test_password"
            });
  const authToken = response.body.token;
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
        expect(response.body[1].event_name).equals("Sarah Millican - Bobby Dazzler");
        expect(response.body[2].event_name).equals(`Nature Kid's Club at Broughgammon Farm`);
        expect(response.body[3].event_name).equals("Sunrise Yoga on Devenish Island Experience");
      });
    });

    describe("Add to Featured Events", function () {
      it("should successfully add a specific event to featured events", async function () {
        const id = 7;
        const response = await request(app)
        .post(`/event/addtofeatured/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1);
      });
      it("should return error message if can't add to featured events", async function () {
        const id = 1;
        const response = await request(app)
        .post(`/event/addtofeatured/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(0);    
      });
    });

    describe("Remove from Featured Events", function () {
      it("should successfully remove a specific event from featured events", async function () {
        const id = 7;
        const response = await request(app)
        .post(`/event/removefromfeatured/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1);
      });
      it("should return error message if can't remove from featured events", async function () {
        const id = 11111111;
        const response = await request(app)
        .post(`/event/removefromfeatured/${id}`)
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(0);
      });
    });

    describe("Get Event Comments", function () {
      it("should successfully get all comments for an event", async function () {
        const id = 8;
        const response = await request(app)
          .get(`/event/comments/${id}`);
          expect(response.status).equals(200);
          expect(response.body[0].comment_id).equals(35);
          expect(response.body[0].event_comment_body).equals("I can't wait for this!");
          expect(response.body[0].event_comment_time).equals("2022-08-10 11:11:40");
          expect(response.body[0].first_name).equals("Louise");
          expect(response.body[0].last_name).equals("Smith");
          expect(response.body[0].user_profile_picture).equals("1662070193260.jpg");
          expect(response.body[1].comment_id).equals(39);
          expect(response.body[1].event_comment_body).equals("Sure to be a great night.");
          expect(response.body[1].event_comment_time).equals("2022-08-30 17:14:03");
          expect(response.body[1].first_name).equals("Jonny");
          expect(response.body[1].last_name).equals("Johnston");
          expect(response.body[1].user_profile_picture).equals("1661885550640.jpg");
      });
      it("should return No comments message if no comments found", async function () {
          const id = 1;
          const response = await request(app)
          .get(`/event/comments/${id}`)
          expect(response.status).equals(200);
          expect(response.body).to.deep.equal({message:"No comments for this event"});
      });
    });

   /* describe("Create a New Event", function () {
      it("should successfully create a new event", async function () {
        const response = await request(app)
        .post(`/createevent`)
        set('accessToken', authToken)
            .send({
              eventName: "another test event name",
              eventDescriptionIntro: "another test event description",
              eventDescriptionBody: "another test event description",
              eventDate: "2022-11-11",
              eventTime: "test event time",
              eventLocation: "test event location",
              eventImage: "test event image",
              eventTicketLink: "another test link",
              eventFree: "0",
              userId: "17",
              genreId: "16"
            })
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1);
      })
      it("should return No comment message if no comments found", async function () {
        const id = 1;
        const response = await request(app)
        .get(`/event/comments/${id}`)
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"No comments for this event"});
    });
    });*/

    describe("Add New Event Comment", function () {
      it("should successfully add a new event comment", async function () {
        const response = await request(app)
        .post(`/event/addcomment`)
        .set('accessToken', authToken)
        .send({
          commentBody: "test_comment_body",
          commentEventId: "4",
          commentTime: "2022-09-07 15:33:43"
        })
        expect(response.status).equals(200);
        expect(response.body.affectedRows).equals(1);
      });
      it("should return error message if can't add comment", async function () {
        const response = await request(app)
        .post(`/event/addcomment`)
        .set('accessToken', authToken)
        .send({
          commentBody: "test",
          commentEventId: "test",
          commentTime: "test",
          userId: "test"
        })
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"Parameter validation failed"});
      });
    });

    describe("Get Events Awaiting Approval", function () {
      it("should successfully get information for all events awaiting approval", async function () {
        const response = await request(app)
        .get(`/event/awaitingapproval`);
        expect(response.body[0].event_name).equals("MAMMA MIA!");
        expect(response.body[1].event_name).equals("Fairground");
      });
    });

    describe("Admin Approve Event", function () {
      it("should successfully approve an event (admin)", async function () {
        const id = 60;
        const response = await request(app)
        .post(`/event/approveevent/${id}`)
        .set('accessToken', authToken)
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message: "success"});
      });
    });

    describe("Event Increase Interested", function () {
      it("should successfully increase the number of users interested in an event", async function () {
        const id = 4;
        const response = await request(app)
        .post(`/event/approveevent/${id}`)
        .set('accessToken', authToken)
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message: "success"});
      });
    });

  });