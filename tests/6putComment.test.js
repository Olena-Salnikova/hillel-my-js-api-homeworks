import {test, describe, expect} from "@jest/globals";
import axios from 'axios';
import {API_URL} from "../src/constants/api.js";

describe.skip('Comments API', () => {
  test('PUT /comments/1 updates an existing comment', async () => {
    const updatedComment = {
      postId: 1,
      name: 'Updated User',
      email: 'test2@example.com',
      body: 'This is an updated test comment',
    };
    const response = await axios.put(`${API_URL}/comments/1`, updatedComment);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data.name).toBe(updatedComment.name);
    expect(response.data.email).toBe(updatedComment.email);
    expect(response.data.body).toBe(updatedComment.body);
    expect(response.data.postId).toBe(updatedComment.postId);
  });
});