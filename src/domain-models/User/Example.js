import User from './User';

const userDomainModel = new User();

/*
  if you use an authorized user method and the user is not authorized,
  the method return:

 {
  status: 401,
  statusText: 'Unauthorized',
 };
*/

// ============ Init() - run when the App starts =========

userDomainModel.init();

/*
  this method checks the authorization status and saves it in User.isAuthorized.
  It can also get into local storage (localStorage.getItem ('isAuthorized'))
*/

// ============ register(user) =============

const registerData = {
  email: 'jack1234@gmail.com',
  password: 'Ab12345-',
};

userDomainModel.register(registerData).then((res) => console.log(res));

/*
  console log:
 {
  data:{
    email: "jack1234@gmail.com",
    id: "5eef7fc75a08ac00171d8db4",
  }
 },
  status: 200,
  statusText: "OK",
  }
*/

// ============== signIn(user) ==================

const signInData = {
  email: 'jack1234@gmail.com',
  password: 'Ab12345-',
};

userDomainModel.signIn(signInData).then((res) => console.log(res));

/*
  console log:
 {
  status: 200,
  statusText: "OK",
  }
*/

// ============== update(user) ==================

const updateData = {
  email: 'jack123455@gmail.com',
  password: 'Ab12345-',
};

userDomainModel.update(updateData).then((res) => console.log(res));

/*
  console.log:
 {
   data: {
    email: "jack123455@gmail.com",
    id: "5eef7fc75a08ac00171d8db4",
  },
   status: 200,
   statusText 'OK'
 }
*/

// ============== remove()  ==================

userDomainModel.remove().then((res) => console.log(res));

/*
  console log:
 {
  status: 204,
  statusText: "No Content"
 }
*/

// Success delete

// ============== LogOut ==================

userDomainModel.logOut();

/*
  this method clears the user token and user ID,
  switches the isAuthorization property to "false"
*/
