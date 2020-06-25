const rootUrl = 'https://afternoon-falls-25894.herokuapp.com/';

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
    getChunk: (page, group) => ({
      url: `${rootUrl}words?page=${page}&group=${group}`,
      options: getOptions('GET'),
    }),

    getWordById: (wordId) => ({
      url: `${rootUrl}words/${wordId}`,
      options: getOptions('GET'),
    }),

    createUserWord: (userId, token, wordId, word) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('POST', token, word),
    }),

    getUserWordById: (userId, token, wordId) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('GET', token),
    }),

    getAllUserWords: (userId, token) => ({
      url: `${rootUrl}users/${userId}/words/`,
      options: getOptions('GET', token),
    }),

    updateUserWord: (userId, token, wordId, word) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('PUT', token, word),
    }),

    deleteUserWord: (userId, token, wordId) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,
      options: getOptions('DELETE', token),
    }),

    getAggregatedWords: (userId, token, data) => {
      const { group, wordsPerPage, filter } = data;
      return {
        url: `${rootUrl}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
        options: getOptions('GET', token),
      };
    },

    getAggregatedWordData: (userId, token, wordId, data) => ({
      url: `${rootUrl}users/${userId}/aggregatedWords/${wordId}`,
      options: getOptions('GET', token, data),
    }),
  },

  statistics: {
    update: (userId, token, data) => ({
      url: `${rootUrl}users/${userId}/statistics`,
      options: getOptions('PUT', token, data),
    }),

    get: (userId, token) => ({
      url: `${rootUrl}users/${userId}/statistics`,
      options: getOptions('GET', token),
    }),
  },

  settings: {
    update: (userId, token, data) => ({
      url: `${rootUrl}users/${userId}/settings`,
      options: getOptions('PUT', token, data),
    }),

    get: (userId, token) => ({
      url: `${rootUrl}users/${userId}/settings`,
      options: getOptions('GET', token),
    }),
  },
};

export default endPoints;
