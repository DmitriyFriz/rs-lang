// constants
import { VOCABULARY } from '../../domain-models/Words/Words.Constants';

// views
import Vocabulary from './Vocabulary.View.Learning';

class VocabularyDeleted extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.vocabularyType = VOCABULARY.REMOVED;
  }
}

export default VocabularyDeleted;
