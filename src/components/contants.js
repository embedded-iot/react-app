export const WEBSITE_NAME = 'LIKE68';
export const WEBSITE_DOMAIN = 'Like68.vn';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_ACCOUNT: '/forgot-account',
  LOGOUT: '/logout',
  ACCOUNT_INFO: '/account-info',
  SERVICES: `/services`,
  DETAIL_SERVICE: `/services/:serviceKey/:serviceName`,
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

export const ORDER_STATUS = [
  { value: 'Hoàn thành' },
  { value: 'Hủy' },
  { value: 'Yêu cầu Hủy' },
  { value: 'Tạm dừng' },
  { value: 'Chờ hoàn tiền' },
  { value: 'Đã hoàn tiền' },
  { value: 'Tăng một phần' },
  { value: 'Lên lịch' },
  { value: 'Đang kiểm tra' },
  { value: 'Đang xử lý...' },
  { value: 'Đợi chạy' },
  { value: 'Đang chạy' },
];

export const PRODUCT_TYPES = {
  YOUTUBE: 'YOUTUBE',
  TIKTOK: 'TIKTOK',
  SHOPPE: 'SHOPPE',
};

export const ACTIVE_PRODUCT_TYPES = [
  PRODUCT_TYPES.YOUTUBE,
];

export const POST_KEYS = {
  BUFF_FB_LIKE: 'buff-fb-like',
  UNLOCK_FB_ACC: 'unlock-fb-acc',
  HOTLINE_FB_VN: 'hotline-fb-vn',
  ICON_FB_2020: 'icon-fb-2020',
  VERIFY_FB_ACC: 'verify-fb-acc',
};

export const DATETIME_FORMAT = "DD/MM/YYYY HH:MM";
