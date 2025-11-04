import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import {API_URL} from "../src/constants/api.js";

describe.skip('Comments API', () => {
  test('POST /comments creates a new comment', async () => {
    const newComment = {
      postId: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'This is a test comment',
    };

    const response = await axios.post(`${API_URL}/comments`, newComment);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(newComment.name);
    expect(response.data.email).toBe(newComment.email);
    expect(response.data.body).toBe(newComment.body);
    expect(response.data.postId).toBe(newComment.postId);
  });
});