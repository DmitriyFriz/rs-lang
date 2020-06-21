import User from './User';

// ============ Init (run when the App starts) =========

User.init();

/*
  this method checks the authorization status and saves it in User.isAuthorized.
  It can also get into local storage (localStorage.getItem ('isAuthorized'))
*/

// ============ Registration =============

const registerData = {
  email: 'jack1234@gmail.com',
  password: 'Ab12345-',
};

User.register(registerData);

/*
  === console.log ===
{
  status: 200,
  statusText 'OK'
}
*/

// ============== SignIn ==================

const signInData = {
  email: 'jack1234@gmail.com',
  password: 'Ab12345-',
};

User.signIn(signInData);

/*
  === console.log ===
{
  status: 200,
  statusText 'OK'
}
*/

// ============== Update user data ==================

const updateData = {
  email: 'jack1234@gmail.com',
  password: 'Ab12345-',
};

User.update(updateData);

/*
  === console.log ===
{
  status: 200,
  statusText 'OK'
}

if user is not authorized, returned null

*/

// ============== Remove user  ==================

User.remove();

/*
  === console.log ===
{
  status: 204,
  statusText 'No content'
}

if user is not authorized, returned null

*/

// ============== LogOut ==================

User.logOut();

/*
  === console.log ===

Returned undefined

*/
