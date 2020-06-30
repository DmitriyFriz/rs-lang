/* eslint-disable no-console */
import Words from './Words';

// new Words (group);

const wordsDomainModel = new Words(0);

// init wordsDomain

/*
  if you use an authorized user method and the user is not authorized,
  the method return:

 {
  status: 401,
  statusText: 'Unauthorized',
 };
*/

// ============ getChunk(page, group) - get the words of the given page & group =========

const page = 1;
const group = 1;

wordsDomainModel.getChunk(page, group).then((res) => console.log(res));

/*
  console log:
[
  {
    "id": "string",
    "word": "string",
    "image": "string",
    "audio": "string",
    "audioMeaning": "string",
    "audioExample": "string",
    "textMeaning": "string",
    "textExample": "string",
    "transcription": "string",
    "wordTranslate": "string",
    "textMeaningTranslate": "string",
    "textExampleTranslate": "string"
  }
  ...
]
*/

// ============ getWordById(wordId) =============

{
  const wordId = '5e9f5ee35eb9e72bc21af70c';

  wordsDomainModel.getWordById(wordId).then((res) => console.log(res));
}

/*
  console log:
 {
  data: {
    audio: "files/02_0621.mp3"
    audioExample: "files/02_0621_example.mp3"
    audioMeaning: "files/02_0621_meaning.mp3"
    group: 1
    id: "5e9f5ee35eb9e72bc21af70c"
    image: "files/02_0621.jpg"
    page: 1
    textExample: "She was <b>anxious</b> about not making her appointment on time."
    textExampleTranslate: "Она беспокоилась о том, чтобы не договориться о встрече вовремя"
    textMeaning: "<i>Anxious</i> means feeling worried or nervous."
    textMeaningTranslate: "Тревожно означает чувствовать себя обеспокоенным или нервным"
    transcription: "[ǽŋkʃəs]"
    word: "anxious"
    wordTranslate: "озабоченный"
    wordsPerExampleSentence: 10
  },
  status: 200,
  statusText: "OK"
 }
*/

// ============ createUserWord(wordId, difficulty, vocabulary)  =============

{
  const wordId = '5e9f5ee35eb9e72bc21af70c';

  wordsDomainModel.createUserWord(wordId, 'easy', 'removed').then((res) => console.log(res));
}

/*
  console log:
 {
  data: {
    difficulty: "easy",
    id: "5eef81545a08ac00171d8db9",
    optional: {
      amount: 44,
      date: 1593111591269,
      repeat:
        date: 1593112191269,
        status: false,
    }
    wordId: "5e9f5ee35eb9e72bc21af70c",
  },
  status: 200,
  statusText: "OK"
 }
*/

// ============ updateUserWord(wordId, difficulty, vocabulary)  =============

{
  const wordId = '5e9f5ee35eb9e72bc21af70c';

  wordsDomainModel.updateUserWord(wordId, 'hard').then((res) => console.log(res));
}

/*
  console log:
 {
  data: {
    difficulty: "hard",
    id: "5eef81545a08ac00171d8db9",
    optional: {
      amount: 44,
      date: 1593111591355,
      repeat:
        date: 1593111591355,
        status: false,
    }
    wordId: "5e9f5ee35eb9e72bc21af70c",
  },
  status: 200,
  statusText: "OK"
 }
*/

// ============ getUserWordById(wordId)  =============

{
  const wordId = '5e9f5ee35eb9e72bc21af70c';

  wordsDomainModel.getUserWordById(wordId).then((res) => console.log(res));
}

/*
  console log:
 *
 {
  data: {
    difficulty: "medium",
    id: "5eef81545a08ac00171d8db9",
    optional: {
      testFieldBoolean: false,
      testFieldString: "test2",
    }
    wordId: "5e9f5ee35eb9e72bc21af70c",
  },
  status: 200,
  statusText: "OK"
 }
*/

// ============ getAllUserWords()  =============

wordsDomainModel.getAllUserWords().then((res) => console.log(res));

/*
  console log:
 {
  data:
    [
      {
        difficulty: "medium",
        id: "5eef81545a08ac00171d8db9",
        optional: {
          testFieldBoolean: false,
          testFieldString: "test2",
        }
        wordId: "5e9f5ee35eb9e72bc21af70c",
      },
      ...
    ],
  status: 200,
  statusText: "OK"
 }
*/

// ============ deleteUserWords()  =============

{
  const wordId = '5e9f5ee35eb9e72bc21af70c';

  wordsDomainModel.deleteUserWord(wordId).then((res) => console.log(res));
}

/*
  console log:
 {
  status: 204,
  statusText: "No Content"
 }
*/

// Success delete


// ============ getAllUserWords()  =============

wordsDomainModel.getAllUserWords().then((res) => console.log(res));

/*
  console log:
 {
  data:
    [
      {
        difficulty: "medium",
        id: "5eef81545a08ac00171d8db9",
        optional: {
          testFieldBoolean: false,
          testFieldString: "test2",
        }
        wordId: "5e9f5ee35eb9e72bc21af70c",
      },
      ...
    ],
  status: 200,
  statusText: "OK"
 }
*/

// ============ deleteUserWords()  =============
