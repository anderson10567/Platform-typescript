import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { deleteArticle } from '../service/deleteartical-service';

import { RootState } from './store';

export const deleteArticleThunk = createAsyncThunk<string, string>(
  'article/deleteArticleFetch',
  async (slug, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { token } = state.account;
    if (!token) {
      return rejectWithValue('Отсутствует токен для удаления статьи');
    }
    return deleteArticle(slug, token, rejectWithValue);
  }
);

interface ArticleState {
  articles: Array<{ slug: string }>;
  article: { slug: string } | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ArticleState = {
  articles: [],
  article: null,
  isLoading: false,
  isError: false,
};

const deleteArticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteArticleThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteArticleThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.articles = state.articles.filter((article) => article.slug !== action.payload);
        state.article = null;
      })
      .addCase(deleteArticleThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const deleteArticleReducer = deleteArticleSlice.reducer;
