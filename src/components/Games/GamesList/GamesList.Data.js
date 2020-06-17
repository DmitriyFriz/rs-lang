import { GAMES_ROUTES } from '../../../router/Router.Constants';

const games = [
  {
    name: 'SpeakIt',
    description: 'Improve your English pronunciation and learn new words',
    id: 'speak-it',
    destination: GAMES_ROUTES.SPEAK_IT,
  },
  {
    name: 'English puzzle',
    description: 'Practice your writing English skills',
    id: 'english-puzzle',
    destination: GAMES_ROUTES.ENGLISH_PUZZLE,
  },
  {
    name: 'Savannah',
    description: 'Hone listening comprehension and translation skills',
    id: 'savannah',
    destination: GAMES_ROUTES.SAVANNAH,
  },
  {
    name: 'Sprint',
    description: 'Learn how to quickly translate from English',
    id: 'sprint',
    destination: GAMES_ROUTES.SPRINT,
  },
  {
    name: 'Audiochallenge',
    description: 'Improves you listening skills in English',
    id: 'audiochallenge',
    destination: GAMES_ROUTES.AUDIO_CHALLENGE,
  },
  {
    name: 'Our game',
    description: '???',
    id: 'our-game',
    destination: GAMES_ROUTES.MYSTERIOUS,
  },
];

export default games;
