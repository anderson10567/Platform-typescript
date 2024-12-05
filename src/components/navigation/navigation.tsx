import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { RootState } from '../../redux/store';
import { fetchArticlesThunk } from '../../redux/article-reducer';
import { accountReducerSlice } from '../../redux/account-reducer';
import avatar from '../../images/avatar.png';
import { useAppDispatch } from '../../often';

import classes from './navigation.module.scss';

interface User {
  username?: string;
  image?: string;
}

const Navigation: React.FC = () => {
  const page = useSelector((state: RootState) => state.articles.page);
  let user: User | null = useSelector((state: RootState) => state.account.user) as User | null;
  const dispatch = useAppDispatch();
  const mainButton = classNames(classes.navigation__button, classes['navigation__button-main']);
  const signInButton = classNames(classes.navigation__button, classes['navigation__button-sign-in']);
  const signUpButton = classNames(classes.navigation__button, classes['navigation__button-sign-up']);
  const createArticleButton = classNames(classes.navigation__button, classes['navigation__button-create-article']);
  const profileButton = classNames(classes.navigation__button, classes['navigation__button-profile']);
  const logOutButton = classNames(classes.navigation__button, classes['navigation__button-log-out']);

  const handleLogoutClick = () => {
    dispatch(accountReducerSlice.actions.logOut());
  };

  const handleClick = () => {
    dispatch(fetchArticlesThunk((page - 1) * 5));
  };

  if (!user && localStorage.getItem('token') !== null) {
    const dataFromStorage = localStorage.getItem('user');
    if (dataFromStorage) {
      user = JSON.parse(dataFromStorage);
    }
  }

  return (
    <section className={classes.navigation}>
      <Link to="/articles" className={mainButton} onClick={handleClick}>
        Realworld Blog
      </Link>

      {user ? (
        <div className={classes.navigation__section}>
          <Link to="/new-article" className={createArticleButton}>
            Create article
          </Link>
          <Link to="/profile" className={profileButton}>
            <span>{user.username || 'user'}</span>
            <img src={user.image || avatar} alt="user avatar" className={classes['navigation__button-image']} />
          </Link>
          <a href="/" className={logOutButton} onClick={handleLogoutClick}>
            Log Out
          </a>
        </div>
      ) : (
        <div className={classes.navigation__section}>
          <Link to="/sign-in" className={signInButton}>
            Sign In
          </Link>
          <Link to="/sign-up" className={signUpButton}>
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navigation;
