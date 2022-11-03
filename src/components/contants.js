export const WEBSITE_NAME = 'Fulfil';
export const WEBSITE_DOMAIN = 'Fulfil.com';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  FRONT_USER_ALL_PRODUCTS: '/categories',
  FRONT_USER_SKU: '/sku',
  ACCOUNT_INFO: '/account-info',
  SERVICES: `/services`,
  DETAIL_SERVICE: `/services/:productType/:serviceId/:serviceName`,
  ACCOUNT_ASSETS: '/account-assets/:tab',
  ACCOUNT_ASSETS_INVOICES_HISTORY: '/account-assets/deposits-history',
  ACCOUNT_ASSETS_INVOICES_METHODS: '/account-assets/deposit-methods',
  ACCOUNT_ASSETS_ORDERS_HISTORY: '/account-assets/orders-history',
  INVOICES_HISTORY: '/deposits-history',
  ORDERS_HISTORY: '/orders-history',
  PRICES: '/prices',
  PRICES_FOR_PARTNER: '/prices-for-partner',
  FIND_FACEBOOK_ID: '/find-facebook-id',
  MAKE_MONEY: '/make-money',
  NOTIFICATION: '/notification',
  FB_PAGE: '/fb-page',
  FB_ADMIN: '/fb-admin',
  CONTACT_INFO: '/contact-info',
  POSTS: '/posts',
  DETAIL_POSTS: '/posts/:postKey/:postName',
}

export const ORDER_STATUS = {
  REQUESTED: 'REQUESTED',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
};

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.REQUESTED]: 'Đã gửi yêu cầu',
  [ORDER_STATUS.IN_PROGRESS]: 'Đang xử lý...',
  [ORDER_STATUS.DONE]: 'Hoàn thành',
  [ORDER_STATUS.REJECTED]: 'Đã từ chối',
  [ORDER_STATUS.CANCELED]: 'Đã hủy',
}


export const ORDER_STATUS_OPTIONS = [
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.REQUESTED], value: ORDER_STATUS.REQUESTED },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.IN_PROGRESS], value: ORDER_STATUS.IN_PROGRESS },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.DONE], value: ORDER_STATUS.DONE },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.REJECTED], value: ORDER_STATUS.REJECTED },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.CANCELED], value: ORDER_STATUS.CANCELED },
];

export const DATETIME_FORMAT = "DD/MM/YYYY HH:MM";


export const RESPONSIVE_MEDIAS = {
  MOBILE: { query: '(max-width: 768px)' },
  TABLET: { query: '(max-width: 1124px)' },
  DESKTOP: { query: '(max-width: 4096px)' },
}
