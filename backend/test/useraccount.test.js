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
        const response = await request(app)
          .post(`/useraccount/updatebio/${id}`)
          .set('accessToken', authToken)
          .send({
            userBio: "bio change test"
          })
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
      const response = await request(app)
        .post(`/useraccount/changename/${id}`)
        .set('accessToken', authToken)
        .send({
          updatedFirstName: "Ronald",
          updatedLastName: "Grint"
        })
        expect(response.status).equals(200);
        expect(response.body.message).equals("success");
    it("should return error message if can't update name", async function () {
        const id = 1;
        const response = await request(app)
        .post(`/useraccount/changename/${id}`)
        .send({
          updatedFirstName: "Ronald",
          updatedLastName: "Grint"
        })
        .set('accessToken', authToken);
        expect(response.status).equals(200);
        expect(response.body).to.deep.equal({message:"Can't update name"});
    });
  });
});

describe("Update User Password", function () {
  it("should successfully update user's password", async function () {
    const id = 40;
    const response = await request(app)
      .post(`/useraccount/changepassword/${id}`)
      .set('accessToken', authToken)
      .send({
        updatedPassword: "ronald123"
      })
      expect(response.status).equals(200);
      expect(response.body.affectedRows).equals(1);
  it("should return error message if can't update password", async function () {
      const id = 1;
      const response = await request(app)
      .post(`/useraccount/changepassword/${id}`)
      .send({
        updatedFirstName: "ronald123"
      })
      .set('accessToken', authToken);
      expect(response.status).equals(200);
      expect(response.body).to.deep.equal({error: "Failed to update password"});
  });
});
});

describe("Get All Events User is Interested In", function () {
  it("should successfully get all events user is interested in", async function () {
    const id = 33;
    const response = await request(app)
    .get(`/useraccount/myevents/${id}`)
    .set('accessToken', authToken);
    expect(response.status).equals(200);
    expect(response.body[0].event_id).equals(5);
    expect(response.body[0].event_name).equals("Joanne McNally - The Prosecco Express");
    expect(response.body[0].event_date).equals("2022-10-14");
    expect(response.body[0].event_time).equals("8pm");
    expect(response.body[0].event_img).equals("JoanneMcNally_HR_1-min-1125x1125.jpg");
  });
  it("should return no interested events message if no interested events found", async function () {
    const id = 1;
    const response = await request(app)
    .get(`/useraccount/myevents/${id}`)
    .set('accessToken', authToken);
    expect(response.status).equals(200);
    expect(response.body).to.deep.equal({message:"This user isn't interested in any events"});
  });
});

describe("Get All Events User Has Posted", function () {
  it("should successfully get all events user has posted", async function () {
    const id = 58;
    const response = await request(app)
    .get(`/useraccount/postedevents/${id}`)
    .set('accessToken', authToken);
    expect(response.status).equals(200);
    expect(response.body[0].event_id).equals(71);
    expect(response.body[0].event_name).equals("test");
    expect(response.body[0].event_date).equals("2022-09-28");
    expect(response.body[0].event_time).equals("7pm");
    expect(response.body[0].event_img).equals("testimg.jpg");
  });
  it("should return a user hasnt posted events message if no events found", async function () {
    const id = 1;
    const response = await request(app)
    .get(`/useraccount/postedevents/${id}`)
    .set('accessToken', authToken);
    expect(response.status).equals(200);
    expect(response.body).to.deep.equal({message:"This user hasn't posted any events"});
  });
});

describe("Add Event to Events User is Interested In", function () {
  it("should successfully add an event to a user's list of interested events", async function () {
    const id = 58;
    const response = await request(app)
      .post(`/useraccount/addtointerested/${id}`)
      .set('accessToken', authToken)
      .send({
        eventId: "5"
      })
      expect(response.status).equals(200);
      expect(response.body.message).equals("success");
  it("should return error message if can't add event to user's list of interested events", async function () {
      const id = 1;
      const response = await request(app)
      .post(`/useraccount/addtointerested/${id}`)
      .send({
        eventId: "5"
      })
      .set('accessToken', authToken);
      expect(response.status).equals(200);
      expect(response.body).to.deep.equal({message:"Can't add interested event"});
  });
});
});

});
