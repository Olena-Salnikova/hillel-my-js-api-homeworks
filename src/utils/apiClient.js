import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { QAAUTO_API_URL } from "../constants/api.js";

export function createApiClient() {
  const jar = new CookieJar();
  const client = wrapper(axios.create({
    baseURL: QAAUTO_API_URL,
    validateStatus: () => true,
    jar
  }));
  return { client, jar };
}