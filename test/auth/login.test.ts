import  supertest from 'supertest'
import {app} from '../../src/app'
import { connectDB } from '../../src/config/connection';
import { MESSAGES } from '../../src/constant/message';
// connectDB()
// describe('test app routes', () => {
//   it('works', () =>
//     supertest(app)
//       .post('/v1/auth/login')
//       .expect('Content-Type', /json/)
//       .expect(200)
//     )
// });

beforeAll(async () => {
  // Connect to the database before running tests
  await connectDB();
});

describe('Authentication API: POST /v1/auth/login', () => {
  // Test case for successful login
  it('logs in a user with valid credentials', async () => {
    // Define the user's email and password
    const userData = {
      "email":"hello@gmail.com","password":"Apt@1888"
    };

    // Send a POST request to the login endpoint
    const response = await supertest(app)
      .post('/v1/auth/login')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200);
    // Add assertions to validate the response
    expect(response.body).toHaveProperty('message',  MESSAGES.USER_LOGIN_SUCCESS);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('email', 'hello@gmail.com');

  });

  // Test case for unsuccessful login (invalid credentials)
  it('rejects login with invalid password', async () => {
    // Define invalid user data (e.g., wrong password)
    const invalidUserData = {
      "email":"hello@gmail.com","password":"Apt@1888s"
    };

    // Send a POST request to the login endpoint with invalid credentials
    const response = await supertest(app)
      .post('/v1/auth/login')
      .send(invalidUserData)
      .expect('Content-Type', /json/)
      .expect(401); // Expecting a 401 Unauthorized status code for invalid credentials
    // Add assertions to validate the response
    expect(response.body).toHaveProperty('message',  MESSAGES.USER_WRONG_EMAIL_OR_PASSWORD);
    expect(response.body).toHaveProperty('status', false);

    expect(response.body).not.toHaveProperty('user'); // No user data should be present
  });

  // email not exist
  it('rejects login with email not exist in the system', async () => {

    const invalidUserData = {
      "email":"hellshghdhgsdgshshgdo@gmail.com","password":"Apt@1888s"
    };

    // Send a POST request to the login endpoint with invalid credentials
    const response = await supertest(app)
      .post('/v1/auth/login')
      .send(invalidUserData)
      .expect('Content-Type', /json/)
      .expect(404); // Expecting a 401 Unauthorized status code for invalid credentials
    // Add assertions to validate the response
    expect(response.body).toHaveProperty('message',  MESSAGES.USER_NOT_EXIST);
    expect(response.body).toHaveProperty('status', false);

    expect(response.body).not.toHaveProperty('user'); // No user data should be present
  });

  //server side  validation
  it('rejects login with invalid body', async () => {
    const invalidUserData = {
      "email":"hellshghdhgsdgshshgdo"
    };
    // Send a POST request to the login endpoint with invalid credentials
    const response = await supertest(app)
      .post('/v1/auth/login')
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
