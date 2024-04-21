import supertest from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/connection";
import { MESSAGES } from "../../src/constant/message";
import { user_model } from "../../src/model/user";

beforeAll(async () => {
  // Connect to the database before running tests
  await connectDB();
});
afterAll(async () => {
  // Disconnect from the database after all tests
  await user_model.deleteOne({ email: "hello1234@gmail.com" });
});
describe("Authentication API: POST /v1/auth/register", () => {
  it("register user successfully", async () => {
    const filePath =
      "/home/vivansh/Pictures/Screenshots/Screenshot from 2023-09-12 16-36-15.png";

    // Use supertest to simulate a POST request with a file upload
    const response = await supertest(app)
      .post("/v1/auth/register") // Replace with your actual upload API endpoint
      .field("name", "aad")
      .field("email", "hello1234@gmail.com")
      .field("password", "Apt@1888")
      .field("confirm_password", "Apt@1888")
      .attach("theFiles", filePath); // Attach the file from your local path
    // Assert that the response indicates a successful upload
    expect(response.status).toBe(200);
    // await user_model.deleteOne({ email: "hello1234@gmail.com" });
    // expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    // expect(response.body).toHaveProperty('filename', 'Screenshot from 2023-09-12 16-36-15.png');
  });

  it("register fail due to email already exist", async () => {
    const filePath =
      "/home/vivansh/Pictures/Screenshots/Screenshot from 2023-09-12 16-36-15.png";

    // Use supertest to simulate a POST request with a file upload
    const response = await supertest(app)
      .post("/v1/auth/register")
      .field("name", "aad")
      .field("email", "hello1234@gmail.com")
      .field("password", "Apt@1888")
      .field("confirm_password", "Apt@1888")
      .attach("theFiles", filePath);
    // Assert that the response indicates a successful upload
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('status', false);
    // expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    // expect(response.body).toHaveProperty('filename', 'Screenshot from 2023-09-12 16-36-15.png');
  });

  it('rejects register with invalid body', async () => {
    const invalidUserData = {
      "email":"hellshghdhgsdgshshgdo"
    };
    // Send a POST request to the login endpoint with invalid credentials
    const response = await supertest(app)
      .post('/v1/auth/register')
      .send(invalidUserData)
      .expect('Content-Type', /json/)
      .expect(400); // Expecting a 401 Unauthorized status code for invalid credentials
    // Add assertions to validate the response

    expect(response.body).toHaveProperty('error',  MESSAGES.VALIDATION_ERROR);
    expect(response.body).toHaveProperty('status', false);
    expect(response.body).toHaveProperty('message');
    expect(response.body).not.toHaveProperty('user'); // No user data should be present
  });

});
