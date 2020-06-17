import './style/main.scss';
import { endPoints, createRequest } from './services/requestHandler';

// const point = endPoints.users.update(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjMzMDczNSwiZXhwIjoxNTkyMzQ1MTM1fQ.nu13xbg1VED07kbjyiMLibMgc7bVRHmDlMsRDN14PKA',
//     userId: '5ee909c812daba0017bdcd5b',
//     user: {
//       email: 'jack123455@mail.ru',
//       password: 'Ab123455-',
//     },
//   },
// );

// const point = endPoints.words.createUserWord({
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM3OTMwMCwiZXhwIjoxNTkyMzkzNzAwfQ.zCaDYEIs_hd-f_2Rbh_mFXq5liI1qv1BEUtn675Ac7o',
//   userId: '5ee909c812daba0017bdcd5b',
//   wordId: '5e9f5ee35eb9e72bc21af716',
//   word: { difficulty: 'weak', optional: { testFieldString: 'test', testFieldBoolean: true } },
// });

// const point = endPoints.words.updateUserWord({
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM3OTMwMCwiZXhwIjoxNTkyMzkzNzAwfQ.zCaDYEIs_hd-f_2Rbh_mFXq5liI1qv1BEUtn675Ac7o',
//   userId: '5ee909c812daba0017bdcd5b',
//   wordId: '5e9f5ee35eb9e72bc21af716',
//   word: { difficulty: 'weak', optional: { testFieldString: 'test22', testFieldBoolean: true } },
// });

// const point = endPoints.words.getUserWord(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM3OTMwMCwiZXhwIjoxNTkyMzkzNzAwfQ.zCaDYEIs_hd-f_2Rbh_mFXq5liI1qv1BEUtn675Ac7o',
//     userId: '5ee909c812daba0017bdcd5b',
//     wordId: '5e9f5ee35eb9e72bc21af716',
//   }
// )

// const point = endPoints.words.deleteUserWord(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM3OTMwMCwiZXhwIjoxNTkyMzkzNzAwfQ.zCaDYEIs_hd-f_2Rbh_mFXq5liI1qv1BEUtn675Ac7o',
//     userId: '5ee909c812daba0017bdcd5b',
//     wordId: '5e9f5ee35eb9e72bc21af716',
//   },
// );

// const point = endPoints.users.signIn(
//   {
//     email: 'jack123455@mail.ru',
//     password: 'Ab123455-',
//   },
// );

// const point = endPoints.statistics.update(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM5NjQzNiwiZXhwIjoxNTkyNDEwODM2fQ.Cso9J3T6c9HNchHuTHmx7QCsUtzR8dyvbbkq_D0o148',
//     userId: '5ee909c812daba0017bdcd5b',
//     data: {
//       learnedWords: 3,
//       optional: {
//         a: 1,
//         b: 'asd',
//       },
//     },
//   },
// );

// const point = endPoints.statistics.get(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM5NjQzNiwiZXhwIjoxNTkyNDEwODM2fQ.Cso9J3T6c9HNchHuTHmx7QCsUtzR8dyvbbkq_D0o148',
//     userId: '5ee909c812daba0017bdcd5b',
//   },
// );

// const point = endPoints.settings.update(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM5NjQzNiwiZXhwIjoxNTkyNDEwODM2fQ.Cso9J3T6c9HNchHuTHmx7QCsUtzR8dyvbbkq_D0o148',
//     userId: '5ee909c812daba0017bdcd5b',
//     data: {
//       wordsPerDay: 2,
//       optional: {
//         easy: 5,
//       },
//     },
//   },
// );

// const point = endPoints.settings.get(
//   {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTkwOWM4MTJkYWJhMDAxN2JkY2Q1YiIsImlhdCI6MTU5MjM5NjQzNiwiZXhwIjoxNTkyNDEwODM2fQ.Cso9J3T6c9HNchHuTHmx7QCsUtzR8dyvbbkq_D0o148',
//     userId: '5ee909c812daba0017bdcd5b',
//   },
// );


// createRequest(point)
//   .then((res) => {
//     console.log(res);
//   });
