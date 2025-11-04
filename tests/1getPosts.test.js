import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import {API_URL} from "../src/constants/api.js";

describe.skip('Posts API', () => {
  test('GET /posts/1 returns valid post', async () => {
    const response = await axios.get(`${API_URL}/posts/1`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
  });
});