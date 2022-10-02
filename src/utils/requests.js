import axios from 'axios';
import authentication from './authentication';

function request(configs = {}, successCallback = () => {}, failCallback = () => {}) {
  const accessToken = authentication.getToken();
  const defaultHeaders = {
    'content-type': 'application/json',
    'authentication': accessToken
  }
  const requestConfigs = {
    ...configs,
    headers: {
      ...defaultHeaders,
      ...(configs.headers || {})
    }
  }
  return axios.request(requestConfigs)
    .then(response => {
      if (response.status === 204 || response.status === 205) {
        successCallback(null);
      } else {
        successCallback(response.data);
      }
    })
    .catch(error => {
      error.response && error.response.data ? failCallback(error.response.data) : failCallback(null);
    })
}

function makeGetWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}) {
  const requestConfigs = {
    method: 'get',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback);
}

function makePostWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}) {
  const requestConfigs = {
    method: 'post',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback);
}

function makePutWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}) {
  const requestConfigs = {
    method: 'put',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback);
}

function makeDeleteWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}) {
  const requestConfigs = {
    method: 'delete',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback);
}

export {
  makeGetWithConfigs,
  makePostWithConfigs,
  makePutWithConfigs,
  makeDeleteWithConfigs,
}


