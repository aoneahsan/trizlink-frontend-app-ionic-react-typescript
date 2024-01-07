export const API_DYNAMIC_PARTS = {
  // short
  //
  // external
  externalAPIs: {
    uiAvatarAPI: {
      name: ':name',
      rounded: ':rounded',
      bold: ':bold',
      size: ':size',
      background: ':background',
      color: ':color',
      fontSize: ':fontSize',
      length: ':length'
    }
  }
};

export const uiAvatarApiDefaultParams = {
  name: 'ahsan mahmood',
  rounded: 'false',
  bold: 'true',
  size: '128',
  background: '000000',
  color: 'fff',
  fontSize: '0.33',
  length: '1'
};
export const errorCodes = {
  badRequest: 400,
  unauthenticated: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  reachedLimit: 429
};
