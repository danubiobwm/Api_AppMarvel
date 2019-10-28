/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import md5 from 'md5';

import { API_PUBLIC_KEY, API_PRIVATE_KEY } from 'react-native-dotenv';

const ts = Number(new Date());
const publicKey = API_PUBLIC_KEY;
const privateKey = API_PRIVATE_KEY;

const hash = md5(ts + privateKey + publicKey);

function api(entity, parameters = '') {
  return parameters
    ? axios.get(
        `https://gateway.marvel.com/v1/public/${entity}?${parameters}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      )
    : axios.get(
        `https://gateway.marvel.com/v1/public/${entity}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
}

export default api;
