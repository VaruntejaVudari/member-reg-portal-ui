import axios from "axios";

const baseURI = "http://localhost:8080"; 
// const baseURI = "http://localhost:5000";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default axios.create({
  baseURL: baseURI,
  headers
});

const apiService = axios.create({
  baseURL: baseURI,
  headers
});

export const httpGet = (url)=>{
  return apiService.post(url);
}