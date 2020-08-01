import axios from 'axios';
import { parseList } from 'src/shared/util/api-utils';
const url = require('url');
axios.interceptors.response.use(response => {
  if (!response.data.id && !response.data.jwt) {
    // It's a list!
    const parsedURL = url.parse(response.config.url).href;
    console.log(parsedURL);
    localStorage.setItem(parsedURL, JSON.stringify(parseList(response.data)));
    response.data = parseList(response.data);
  }
  return response;
}, error => {
  console.log(error)
  return Promise.reject(error);
});
