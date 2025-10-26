import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import {API_URL} from "../src/constants/api.js";

describe('Comments API', () => {
  test('GET /comments/1 returns valid comment', async () => {
    const response = await axios.get(`${API_URL}/comments/1`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('postId');
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('body');
  });
});