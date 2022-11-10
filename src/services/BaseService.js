const getBaseURL = () => {
  return '/api/v1';
}

const getFrontUserBaseURL = () => {
  return getBaseURL() + '/public';
}

const getSellerBaseURL = () => {
  return getBaseURL() + '/reseller';
}

const getAdminBaseURL = () => {
  return getBaseURL() + '/admin';
}

export {
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
}
