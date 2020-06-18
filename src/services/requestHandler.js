const rootUrl = 'https://afternoon-falls-25894.herokuapp.com/';
const NO_CONTENT_STATUS = 204;
const UNAUTHORIZED_STATUS = 401;

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

const authorizationData = {
  get data() {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
    };
  },

  set data([token, userId]) {
    if (token) {
      localStorage.setItem('token', token);
    }
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  },
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

    update: (user) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}`,
      options: getOptions('PUT', authorizationData.data.token, user),
    }),

    delete: () => ({
      url: `${rootUrl}users/${authorizationData.data.userId}`,
      options: getOptions('DELETE', authorizationData.data.token),
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
    update: (data) => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/settings`,
      options: getOptions('PUT', authorizationData.data.token, data),
    }),

    get: () => ({
      url: `${rootUrl}users/${authorizationData.data.userId}/settings`,
      options: getOptions('GET', authorizationData.data.token),
    }),
  },
};

async function checkAuthorizationStatus() {
  const { url, options } = endPoints.settings.update();
  const res = await fetch(url, options);
  return res.status !== UNAUTHORIZED_STATUS;
}

function clearSession() {
  ['token', 'userId'].forEach((key) => localStorage.setItem(key, ''));
}

async function createRequest({ url, options }) {
  try {
    const res = await fetch(url, options);
    const { status, statusText } = res;

    if (!(/2\d\d/.test(status))) {
      throw Error(`${statusText} (${status})`);
    }
    if (status === NO_CONTENT_STATUS) {
      return null;
    }

    const data = await res.json();

    if (data.token) {
      authorizationData.data = [data.token, data.userId];
    }

    return data;
  } catch (e) {
    throw e.message;
  }
}

export {
  endPoints,
  createRequest,
  authorizationData,
  checkAuthorizationStatus,
  clearSession,
};
