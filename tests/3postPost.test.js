import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import {API_URL} from "../src/constants/api.js";

describe.skip('Posts API', () => {
  test('POST /posts creates a new post', async () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a post created during testing',
      userId: 1,
    };

    const response = await axios.post(`${API_URL}/posts`, newPost);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
  });
});