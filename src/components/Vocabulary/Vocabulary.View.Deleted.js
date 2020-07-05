// views
import Vocabulary from './Vocabulary.View.Learning';

// data
import { constants } from './Vocabulary.Data';

class VocabularyDeleted extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.pageType = constants.pageType.deleted;
  }
}

export default VocabularyDeleted;
