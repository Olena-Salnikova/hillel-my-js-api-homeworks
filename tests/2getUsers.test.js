import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import { API_URL } from '../src/constants/api.js';

describe.skip('Users API', () => {
  test('GET /users/1 returns valid user', async () => {
    const response = await axios.get(`${API_URL}/users/1`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('username');
    expect(response.data).toHaveProperty('email');
  });
});