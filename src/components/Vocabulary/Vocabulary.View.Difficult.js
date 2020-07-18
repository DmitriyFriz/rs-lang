// constants
import { VOCABULARY } from 'domainModels/Words/Words.Constants';

// views
import Vocabulary from './Vocabulary.View.Learning';

class VocabularyDifficult extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.vocabularyType = VOCABULARY.DIFFICULT;
  }
}

export default VocabularyDifficult;
