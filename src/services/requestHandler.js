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
    create: (user) => ({
      url: `${rootUrl}users`,
      options: getOptions('POST', null, user),
    }),

    signIn: (user) => ({
      url: `${rootUrl}signin`,
      options: getOptions('POST', null, user),
    }),

    update: ({ token, userId, user }) => ({
      url: `${rootUrl}users/${userId}`,
      options: getOptions('PUT', token, user),
    }),

    delete: ({ token, userId }) => ({
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

    createUserWord: ({
      token, userId, wordId, word,
    }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('POST', token, word),
    }),

    getUserWordById: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('GET', token),
    }),

    getAllUserWords: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('GET', token),
    }),

    updateUserWord: ({
      token, userId, wordId, word,
    }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('PUT', token, word),
    }),

    deleteUserWord: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('DELETE', token),
    }),
  },

  statistics: {
    update: ({ token, userId, data }) => ({
      url: `${rootUrl}users/${userId}/statistics`,
      options: getOptions('PUT', token, data),
    }),

    get: ({ token, userId }) => ({
      url: `${rootUrl}users/${userId}/statistics`,
      options: getOptions('GET', token),
    }),
  },

  settings: {
    get: ({ token, userId }) => ({
      url: `${rootUrl}users/${userId}/settings`,
      options: getOptions('GET', token),
    }),

    update: ({ token, userId, data }) => ({
      url: `${rootUrl}users/${userId}/settings`,
      options: getOptions('PUT', token, data),
    }),
  },
};

async function createRequest({ url, options }) {
  try {
    const res = await fetch(url, options);
    const { status, statusText } = res;

    if (!(/2\d\d/.test(status))) throw Error(`${statusText} (${status})`);
    if (status === NO_CONTENT_STATUS) return null;

    const data = await res.json();
    return data;
  } catch (e) {
    throw e.message;
  }
}

export { endPoints, createRequest };
