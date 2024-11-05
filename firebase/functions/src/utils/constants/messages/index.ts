const general = {
  requestSuccess: 'Request completed successfully.',
  requestFailed: 'Error Occurred, try again later.',
  invalidParams:
    'Invalid params send, please send all required request params.',
  notFound: 'Item Not found, please try again.',
  fetchFailed: 'An error occurred while fetching.'
} as const;

const role = {
  notFound: 'Role not found',
  createFailed: 'An error occurred while creating resume.',
} as const;

const messages = {
  general,
  role
};

export default messages;
