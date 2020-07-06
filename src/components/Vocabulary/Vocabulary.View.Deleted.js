// constants
import STATUSES from 'services/requestHandler.Statuses';

// views
import Vocabulary from './Vocabulary.View.Learning';

// data
import { constants } from './Vocabulary.Data';

class VocabularyDeleted extends Vocabulary {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.pageType = constants.pageType.deleted;
  }

  handleRemove(wordId) {
    this.wordsDomainModel.updateUserWord(wordId, null).then((res) => {
      if (STATUSES.isSuccess(res.status)) {
        console.log(res);
        this.hideWord(wordId);
      }
    });
  }
}

export default VocabularyDeleted;
