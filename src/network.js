import axios from 'axios';
import {useSelector} from 'react-redux';

export const myAxios = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'},
});

export const useAxios = () => {
  const token = useSelector(state => state.login.token);

  const myAxios = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 1000,
    headers: {Authorization: `Bearer ${token}`},
  });

  return myAxios;
};
