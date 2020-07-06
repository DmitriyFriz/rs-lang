// views
import Vocabulary from './Vocabulary.View.Learning';

// data
import { constants } from './Vocabulary.Data';

class VocabularyDifficult extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.pageType = constants.pageType.difficult;
  }

  handleRemove(wordId) {
    this
      .wordsDomainModel
      .updateUserWord(wordId, null, constants.pageType.learning).then((res) => {
      if (STATUSES.isSuccess(res.status)) {
        console.log(res);
        this.hideWord(wordId);
      }
    });
  }
}

export default VocabularyDifficult;
