require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');
const BASE_URL = 'https://gorest.co.in';
const TOKEN = process.env.TOKEN_GOREST; // Ganti dengan token valid

describe('Tes Gorest', () => {
  let userId;

  it('a. Create a new user (Positive)', async () => {
    const response = await axios.post(`${BASE_URL}/public/v2/users`, {
      name: "Kntal",
      gender: "male",
      email: `autotest${Date.now()}@mail.com`,
      status: "active"
    }, {
      headers: { Authorization: TOKEN }
    });

   console.log("Full response:", response.data); // 👈 Tambahkan ini

  // Pastikan struktur respons benar
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('id');

    userId = response.data.id;
  });

  it('a. Create a new user (Negative - missing email)', async () => {
    try {
      await axios.post(`${BASE_URL}/public/v2/users`, {
        name: "Kental",
        gender: "male",
        status: "active"
      }, { headers: { Authorization: TOKEN } });
    } catch (error) {
      expect(error.response.status).to.equal(422);
    }
  });

  it('b. Get user details (Positive)', async () => {
    // try {
    //   await axios.get(`${BASE_URL}/0`, {
    //     headers: {Authorization : TOKEN}
    //   });

    //   // Jika tidak error, berarti test gagal
    //   throw new Error("Expected request to fail with 404, but it succeeded");
    // } catch (error) {
    //   expect(error.response.status).to.equal(404);
    // }
    const response = await axios.get(`${BASE_URL}/public/v2/users/${userId}`, {
      headers: { Authorization: TOKEN }
    });

    expect(response.status).to.equal(200);
    expect(response.data.id).to.equal(userId);
  });

  it('b. Get user details (Negative - invalid ID)', async () => {
    // const response = await axios.get(`${BASE_URL}/0`, {
    //   headers: { Authorization: TOKEN }
    // });

    // expect(response.status).to.equal(404);
    try {
      await axios.get(`${BASE_URL}/0`, {
        headers: {Authorization : TOKEN}
      });
  
        // Jika tidak error, berarti test gagal
      throw new Error("Expected request to fail with 404, but it succeeded");
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('c. Update user details (Positive)', async () => {
    const response = await axios.put(`${BASE_URL}/public/v2/users/${userId}`, {
      name: "Bubur Kental"
    }, {
      headers: { Authorization: TOKEN }
    });

    expect(response.status).to.equal(200);
    expect(response.data.name).to.equal("Bubur Kental");
    console.log("Full response:", response.data);
  });

  it('d. Delete user (Positive)', async () => {
    const response = await axios.delete(`${BASE_URL}/public/v2/users/${userId}`, {
      headers: { Authorization: TOKEN }
    });

    expect(response.status).to.equal(204);
  });

});