import { getSellerBaseURL } from 'services/BaseService';
import { makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STORE_TYPE_LABELS } from 'components/contants';

const transformStore = item => {
  return {
    ...item,
    convertedType: STORE_TYPE_LABELS[item.type] || item.type,
  }
}

function getStores(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/stores';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformStore)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createStore(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/stores';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateStore(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/stores/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function getStore(id, data, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/stores/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getStores,
  createStore,
  updateStore,
  getStore,
}