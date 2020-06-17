const rootUrl = 'https://afternoon-falls-25894.herokuapp.com/';
const NO_CONTENT_STATUS = 204;

const endPoints = {
  users: {
    create(user) {
      return {
        url: `${rootUrl}users`,

        options: {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      };
    },

    signIn: (user) => ({
      url: `${rootUrl}signin`,

      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    }),

    update: ({ token, userId, user }) => ({
      url: `${rootUrl}users/${userId}`,

      options: {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    }),

    delete: ({ token, userId }) => ({
      url: `${rootUrl}users/${userId}`,

      options: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }),
  },

  words: {
    getChunk: ({ page, group }) => ({
      url: `${rootUrl}words?page=${page}&group=${group}`,

      options: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    }),

    getWordById: (wordId) => ({
      url: `${rootUrl}words/${wordId}`,

      options: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    }),

    createUserWord: ({
      token, userId, wordId, word,
    }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,

      options: {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      },
    }),

    getUserWordById: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,

      options: {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    }),

    getAllUserWords: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,

      options: {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    }),

    updateUserWord: ({
      token, userId, wordId, word,
    }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,

      options: {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      },
    }),

    deleteUserWord: ({ token, userId, wordId }) => ({
      url: `${rootUrl}users/${userId}/words/${wordId}`,

      options: {
        method: 'DELETE',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    }),
  },

  statistics: {
    update: ({ token, userId, data }) => ({
      url: `${rootUrl}users/${userId}/statistics`,

      options: {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    }),

    get: ({ token, userId }) => ({
      url: `${rootUrl}users/${userId}/statistics`,

      options: {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    }),
  },

  settings: {
    get: ({ token, userId }) => ({
      url: `${rootUrl}users/${userId}/settings`,

      options: {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    }),

    update: ({ token, userId, data }) => ({
      url: `${rootUrl}users/${userId}/settings`,

      options: {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
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
