const ROUTERS = {
  HEADER: 'HEADER',
  MAIN: 'MAIN',
  GAMES: 'GAMES',
};

const MAIN_ROUTES = {
  MAIN_PAGE: 'MAIN_PAGE',
  GAMES: 'GAMES',
  VOCABULARY: 'VOCABULARY',
  STATISTIC: 'STATISTIC',
  PROMO: 'PROMO',
  ABOUT_TEAM: 'ABOUT_TEAM',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  // LOG_OUT: 'LOG_OUT',
};

const HEADER_ROUTES = {
  HEADER_AUTHORIZED: MAIN_ROUTES.MAIN_PAGE, // 'HEADER_AUTHORIZED',
  HEADER_GUEST: MAIN_ROUTES.PROMO, // 'HEADER_GUEST',
  // SIGN_UP: 'SIGN_UP',
  // SIGN_IN: 'SIGN_IN',
  // LOG_OUT: 'LOG_OUT',
};

const GAMES_ROUTES = {
  GAMES_LIST: 'GAMES_LIST',
  SPEAK_IT: 'SPEAK_IT',
  ENGLISH_PUZZLE: 'ENGLISH_PUZZLE',
  SAVANNAH: 'SAVANNAH',
  SPRINT: 'SPRINT',
  SPRINT_GAME: 'SPRINT_GAME',
  SPRINT_FINISH: 'SPRINT_FINISH',
  AUDIO_CHALLENGE: 'AUDIO_CHALLENGE',
  MYSTERIOUS: 'MYSTERIOUS',
};

const SPEAK_IT_ROUTERS = {
  SPEAK_IT_MAIN: 'SPEAK_IT_MAIN',
};

export {
  ROUTERS,
  HEADER_ROUTES,
  MAIN_ROUTES,
  GAMES_ROUTES,
  SPEAK_IT_ROUTERS,
};
