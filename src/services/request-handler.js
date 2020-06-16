const rootUrl = 'https://afternoon-falls-25894.herokuapp.com/';

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
      mode: 'delete',
    }),

  },
};

async function createRequest({ url, options, mode }) {
  try {
    const res = await fetch(url, options);
    if (mode === 'delete') return null;

    const data = await res.json();
    return data;
  } catch (e) {
    throw Error('request');
  }
}

export { endPoints, createRequest };
