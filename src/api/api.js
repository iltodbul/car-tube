import { getUserData, setUserData, clearUserData } from '../utility.js';

const settings = {
  host: '',
};

async function request(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      return response;
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

function createOptions(method = 'get', body) {
  const options = {
    method,
    headers: {},
  };
  const user = getUserData();
  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
  }
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return options;
}

async function get(url) {
  return await request(url, createOptions());
}

async function post(url, data) {
  return await request(url, createOptions('post', data));
}

async function put(url, data) {
  return await request(url, createOptions('put', data));
}

async function del(url) {
  return await request(url, createOptions('delete'));
}

async function login(username, password) {
  const result = await post(settings.host + '/users/login', {
    username,
    password,
  });

  setUserData(result);

  return result;
}

async function register(username, password) {
  const result = await post(settings.host + '/users/register', {
    username,
    password,
  });

  clearUserData();

  return result;
}

function logout() {
  const result = get(settings.host + '/users/logout');

  setUserData(result);

  return result;
}

export { get, post, put, del, login, register, logout, settings };
