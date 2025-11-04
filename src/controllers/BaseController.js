import { QAAUTO_API_URL } from "../constants/api.js";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default class BaseController {
  constructor(client) {
    this.client = client || wrapper(axios.create({
      baseURL: QAAUTO_API_URL,
      validateStatus: () => true,
      jar: new CookieJar()
    }));
  }
}