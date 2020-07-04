const STATUSES = {
  OK: 200,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  EXPECTATION_FAILED: 417,

  isSuccess: (status) => /2\d\d/.test(status),
};

export default STATUSES;
