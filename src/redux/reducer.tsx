import { combineReducers } from 'redux';

import { getArticlesReducer } from './article-reducer';
import { accountReducer } from './account-reducer';
import { createArticleReducer } from './createartical-reducer';
import { deleteArticleReducer } from './delete-reducer';

const rootReducer = combineReducers({
  articles: getArticlesReducer,
  account: accountReducer,
  myArticle: createArticleReducer,
  article: deleteArticleReducer,
});

export default rootReducer;
