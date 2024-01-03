import axios from "axios";
import { REST_SERVER_ADDR } from "../env/variables";

export const fetcher = axios.create({
  baseURL: REST_SERVER_ADDR + "/api/v1",
});
