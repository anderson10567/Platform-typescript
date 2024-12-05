import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Navigation from '../navigation/navigation';
import ArticlesList from '../articles-list/articles-list';
import Article from '../article/article';
import SignInForm from '../sign-in-form/sign-in-form';
import SignUpForm from '../sign-up-form/sign-up-form';
import NewArticle from '../new-article/new-article';
import EditProfileArticle from '../editprofile-artical/editprofile-artical';
import EditArticle from '../edit-article/edit-article';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.App}>
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/articles/:slug/edit" element={<EditProfileArticle />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/profile" element={<EditArticle />} />
      </Routes>
    </div>
  );
};

export default App;
