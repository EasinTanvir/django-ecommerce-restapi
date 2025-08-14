import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";

export default axios.create({
  baseURL: baseUrl,
});
