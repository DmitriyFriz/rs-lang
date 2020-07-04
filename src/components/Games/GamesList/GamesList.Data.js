import { GAMES_ROUTES } from 'router/Router.Constants';

const games = [
  {
    name: 'SpeakIt',
    description: 'Improve your English pronunciation and learn new words',
    id: 'speak-it',
    destination: GAMES_ROUTES.SPEAK_IT,
    logo: 'speakItLogo.svg',
  },
  {
    name: 'English puzzle',
    description: 'Practice your writing English skills',
    id: 'english-puzzle',
    destination: GAMES_ROUTES.ENGLISH_PUZZLE,
    logo: 'englishPuzzleLogo.svg',
  },
  {
    name: 'Savannah',
    description: 'Hone listening comprehension and translation skills',
    id: 'savannah',
    destination: GAMES_ROUTES.SAVANNAH,
    logo: 'savannahLogo.svg',
  },
  {
    name: 'Sprint',
    description: 'Learn how to quickly translate from English',
    id: 'sprint',
    destination: GAMES_ROUTES.SPRINT,
    logo: 'sprinterLogo.svg',
  },
  {
    name: 'Audiochallenge',
    description: 'Improves you listening skills in English',
    id: 'audiochallenge',
    destination: GAMES_ROUTES.AUDIO_CHALLENGE,
    logo: 'audioCallLogo.svg',
  },
  {
    name: 'Our game',
    description: '???',
    id: 'our-game',
    destination: GAMES_ROUTES.MYSTERIOUS,
    logo: 'yourGameLogo.svg',
  },
];

export default games;
