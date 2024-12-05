import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import getArticles from '../service/article-list-service';
import getSingleArticle from '../service/article-service';
import likeArticle from '../service/likesartical-service';

interface Article {
  slug: string;
  title: string;
  content: string;
}

interface ArticlesState {
  articles: Article[];
  article: Article | null;
  isLoading: boolean;
  articlesCount: number | null;
  isError: boolean;
  page: number;
}

const initialState: ArticlesState = {
  articles: [],
  article: null,
  isLoading: false,
  articlesCount: null,
  isError: false,
  page: 0,
};

export const fetchArticlesThunk = createAsyncThunk<
  {
    articles: Article[];
    articlesCount: number;
  },
  number
>('articles/fetchArticles', async (offset: number, { rejectWithValue }) => {
  return getArticles(offset, rejectWithValue) as any;
});

export const fetchArticleThunk = createAsyncThunk<
  {
    article: Article;
  },
  string
>('article/fetchArticle', async (slug: string, { rejectWithValue }) => {
  return getSingleArticle(slug, rejectWithValue) as any;
});

export const likeArticleThunk = createAsyncThunk<void, { slug: string; favorited: boolean }>(
  'article/likeArticle',
  async ({ slug, favorited }, { rejectWithValue }) => {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;

    if (!token) {
      throw new Error('User not authenticated');
    }

    return likeArticle({ token, slug, favorited });
  }
);

export const articlesReducerSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.article = null;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesThunk.fulfilled,
        (state, action: PayloadAction<{ articles: Article[]; articlesCount: number }>) => {
          state.articles = action.payload.articles;
          state.articlesCount = action.payload.articlesCount;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(fetchArticlesThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchArticleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleThunk.fulfilled, (state, action: PayloadAction<{ article: Article }>) => {
        state.isLoading = false;
        state.isError = false;
        state.article = action.payload.article;
      })
      .addCase(fetchArticleThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { changePage } = articlesReducerSlice.actions;
export const getArticlesReducer = articlesReducerSlice.reducer;
