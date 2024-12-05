import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ArticleProfile from '../article-profile/article-profile';
import Paginations from '../pagination/pagination';
import Loader from '../loader/loader';
import Error from '../error/error';
import { fetchArticlesThunk } from '../../redux/article-reducer';
import { accountReducerSlice } from '../../redux/account-reducer';
import { useAppDispatch } from '../../often';

import classes from './articles-list.module.scss';

interface Article {
  id: number;
  title: string;
  body: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favoritesCount: number;
  author: {
    username: string;
    image: string;
  };
}

interface RootState {
  articles: {
    articles: Article[];
    isLoading: boolean;
    isError: boolean | null;
    page: number;
  };
}

const ArticlesList: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles?.articles || []);
  const isLoading = useSelector((state: RootState) => state.articles.isLoading);
  const isError = useSelector((state: RootState) => state.articles.isError);
  const page = useSelector((state: RootState) => state.articles.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticlesThunk(0));
    dispatch(accountReducerSlice.actions.setUser());
  }, [dispatch]);

  useEffect(() => {
    if (page === 0) {
      dispatch(fetchArticlesThunk(0));
    } else {
      dispatch(fetchArticlesThunk((page - 1) * 5));
    }
  }, [dispatch, page]);

  if (!articles || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const articlesList = articles.map((article) => <ArticleProfile article={article} key={article.slug} />);

  return (
    <section className={classes.articles}>
      <ul className={classes['articles-list']}>{articlesList}</ul>
      <Paginations />
    </section>
  );
};

export default ArticlesList;
