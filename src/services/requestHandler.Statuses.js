const STATUSES = {
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,

  isSuccess: (status) => /2\d\d/.test(status),
};

export default STATUSES;
