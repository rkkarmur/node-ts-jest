import supertest from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/connection";
import { MESSAGES } from "../../src/constant/message";
import { Request ,Response,NextFunction} from "express";

beforeAll(async () => {
  // Connect to the database before running tests
  await connectDB();
});

describe("Authentication API: GET /v1/auth/me", () => {
  it("my profile fail due to authorization fail", async () => {
    const mockSession = {
     user:{email: 'ab@gmail.com',}
    };
  const response = await supertest(app)
    .get("/v1/auth/me")
  console.log('response',response.body);
});


});
