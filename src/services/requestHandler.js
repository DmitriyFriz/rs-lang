const rootUrl = 'https://afternoon-falls-25894.herokuapp.com/';
const NO_CONTENT_STATUS = 204;

const getOptions = (method, token, data) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  if (data && (method === 'PUT' || method === 'POST')) {
    options.body = JSON.stringify(data);
  }

  return options;
};

const endPoints = {
  users: {
    register: (user) => ({
      url: `${rootUrl}users`,
      options: getOptions('POST', null, user),
    }),

    signIn: (user) => ({
      url: `${rootUrl}signin`,
      options: getOptions('POST', null, user),
    }),

    update: (userId, token, user) => ({
      url: `${rootUrl}users/${userId}`,
      options: getOptions('PUT', token, user),
    }),

    remove: (userId, token) => ({
      url: `${rootUrl}users/${userId}`,
      options: getOptions('DELETE', token),
    }),
  },

  words: {
    getChunk: ({ page, group }) => ({
      url: `${rootUrl}words?page=${page}&group=${group}`,
      options: getOptions('GET'),
    }),

    getWordById: (wordId) => ({
      url: `${rootUrl}words/${wordId}`,
      options: getOptions('GET'),
    }),

    createUserWord: ({ wordId, word }) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/words/${wordId}`,
      options: getOptions('POST', authorizationData.data.token, word),
    }),

    getUserWordById: (wordId) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/words/${wordId}`,
      options: getOptions('GET', authorizationData.data.token),
    }),

    getAllUserWords: (wordId) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/words/${wordId}`,
      options: getOptions('GET', authorizationData.data.token),
    }),

    updateUserWord: ({ wordId, word }) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/words/${wordId}`,
      options: getOptions('PUT', authorizationData.data.token, word),
    }),

    deleteUserWord: (wordId) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/words/${wordId}`,
      options: getOptions('DELETE', authorizationData.data.token),
    }),
  },

  statistics: {
    update: (data) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/statistics`,
      options: getOptions('PUT', authorizationData.data.token, data),
    }),

    get: () => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/statistics`,
      options: getOptions('GET', authorizationData.data.token),
    }),
  },

  settings: {
    update: (userId, token, data) => ({
      url: `${rootUrl}users/${userId}/settings`,
      options: getOptions('PUT', token, data),
    }),

    get: () => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/settings`,
      options: getOptions('GET', authorizationData.data.token),
    }),
  },
};

async function createRequest({ url, options }) {
  try {
    const res = await fetch(url, options);
    const { status, statusText } = res;

    if (!/2\d\d/.test(status)
      || status === NO_CONTENT_STATUS) {
      return { status, statusText };
    }

    const data = await res.json();
    return { status, statusText, data };
  } catch (e) {
    throw e.message;
  }
}

export {
  endPoints,
  createRequest,
};
