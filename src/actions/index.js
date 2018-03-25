import axios from 'axios'

const EMAIL_URL = `https://trumail.io/json/`

export const FETCH_EMAILDATA = 'FETCH_USERS';

export function fetchEmailData(query) {
  const q_url = `${EMAIL_URL}${query}`;
  const request = axios.get(q_url);
  return {
    type: FETCH_EMAILDATA,
    payload: request
  };
}
