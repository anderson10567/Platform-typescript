import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createArticle, editArticle } from '../service/createartical-service';
interface Article {
  slug: string;
  title: string;
  body: string;
}

interface ArticleState {
  article: Article | null;
  isCreatingLoading: boolean;
  isCreatingError: boolean | null;
  isEditingLoading: boolean;
  isEditingError: boolean | null;
}

interface ArticlePayload {
  token: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug: string;
}

export const createArticleThunk = createAsyncThunk<Article, ArticlePayload>(
  'myArticle/createArticleFetch',
  async (article: ArticlePayload, { rejectWithValue }) => {
    try {
      const response = await createArticle(article, rejectWithValue);
      return response as any;
    } catch (error) {
      return rejectWithValue('Ошибка создания статьи');
    }
  }
);

// Создаем thunk для редактирования статьи
export const editArticleThunk = createAsyncThunk<Article, ArticlePayload>(
  'myArticle/editArticleFetch',
  async (article: ArticlePayload, { rejectWithValue }) => {
    try {
      const response = await editArticle(article, rejectWithValue);
      return response as any;
    } catch (error) {
      return rejectWithValue('Ошибка редактирования статьи');
    }
  }
);

const initialState: ArticleState = {
  article: null,
  isCreatingLoading: false,
  isCreatingError: null,
  isEditingLoading: false,
  isEditingError: null,
};

const createArticleSlice = createSlice({
  name: 'myArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleThunk.pending, (state) => {
        state.isCreatingLoading = true;
        state.isCreatingError = null;
        state.article = null;
      })
      .addCase(createArticleThunk.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isCreatingLoading = false;
        state.isCreatingError = null;
        state.article = action.payload;
      })
      .addCase(createArticleThunk.rejected, (state) => {
        state.isCreatingLoading = false;
        state.isCreatingError = true;
      })
      .addCase(editArticleThunk.pending, (state) => {
        state.isEditingLoading = true;
        state.isEditingError = null;
        state.article = null;
      })
      .addCase(editArticleThunk.fulfilled, (state, action) => {
        state.isEditingLoading = false;
        state.isEditingError = null;
        state.article = action.payload;
      })
      .addCase(editArticleThunk.rejected, (state) => {
        state.isEditingLoading = false;
        state.isEditingError = true;
      });
  },
});

export const createArticleReducer = createArticleSlice.reducer;
