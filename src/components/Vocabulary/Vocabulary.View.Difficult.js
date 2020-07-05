// views
import Vocabulary from './Vocabulary.View.Learning';

// data
import { constants } from './Vocabulary.Data';

class VocabularyDifficult extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.pageType = constants.pageType.difficult;
  }
}

export default VocabularyDifficult;
