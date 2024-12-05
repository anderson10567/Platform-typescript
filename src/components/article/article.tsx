import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Typography, Modal } from 'antd';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';

import { fetchArticleThunk, fetchArticlesThunk, likeArticleThunk } from '../../redux/article-reducer';
import Loader from '../loader/loader';
import Error from '../error/error';
import avatar from '../../images/avatar.png';
import { deleteArticleThunk } from '../../redux/delete-reducer';
import { useAppDispatch } from '../../often';

import classes from './article.module.scss';

interface Author {
  username: string;
  image?: string;
}

interface Articals {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  tagList: string[];
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}

interface RootState {
  articles: {
    article: Articals;
    isLoading: boolean;
    isError: boolean;
  };
  account: {
    user: {
      username: string;
    };
  };
}

const Article: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.article);
  const isLoading = useSelector((state: RootState) => state.articles.isLoading);
  const isError = useSelector((state: RootState) => state.articles.isError);
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const offset = 0;
  useEffect(() => {
    dispatch(fetchArticlesThunk(offset));
    dispatch(fetchArticleThunk(slug || ''));
  }, [dispatch, slug, offset]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem(`liked_${slug}`) || 'false');
    setIsLiked(liked);
  }, [slug]);

  const handleDelete = () => {
    dispatch(deleteArticleThunk(article.slug));
    setIsModalVisible(false);

    navigate('/articles');
  };
  const oneEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  const handleLike = () => {
    const newFavoritedStatus = !isLiked;
    setIsLiked(newFavoritedStatus);
    console.log(slug);
    localStorage.setItem(`liked_${slug}`, JSON.stringify(newFavoritedStatus));
    dispatch(likeArticleThunk({ slug: article.slug, favorited: article.favorited }));
  };
  if (!article || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const updatedFavoritesCount = isLiked ? article.favoritesCount + 1 : article.favoritesCount;
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');
  const { Text } = Typography;

  const tags = article.tagList.map((tag) => (
    <Text code key={nanoid()}>
      {tag}
    </Text>
  ));

  return (
    <section className={classes['article-section']}>
      <div className={classes.article}>
        <section className={classes['article__text-section']}>
          <div className={classes.article__header}>
            <h5 className={classes.article__title}>{article.title}</h5>
            <button type="button" className={classes['article__likes-section']} onClick={handleLike}>
              <span className={classes.article__like}>{isLiked ? '❤️' : '🤍'}</span>
              <span className={classes.article__count}>{updatedFavoritesCount}</span>
            </button>
          </div>
          <div className={classes['article__tags-section']}>{tags}</div>
          <div className={classes['article__article-text']}>{article.description}</div>
        </section>
        <section className={classes['article__author-section']}>
          <div className={classes['article__name-date-section']}>
            <div>
              <div className={classes['article__author-name']}>{article.author.username}</div>
              <div className={classes['article__date-of-creation']}>{creationDate}</div>
            </div>
            <img
              src={article.author.image || avatar}
              alt="Author avatar"
              className={classes['article__author-avatar']}
            />
          </div>
          {article.author.username === user?.username ? (
            <div className={classes.article__button}>
              <button
                type="button"
                className={classes['article__delete-button']}
                onClick={() => setIsModalVisible(true)}
              >
                Delete
              </button>
              <button type="button" className={classes['article__edit-button']} onClick={oneEdit}>
                Edit
              </button>
            </div>
          ) : null}
        </section>
      </div>
      <div className={classes['article-body']}>
        <Markdown>{article.body}</Markdown>
      </div>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete this article?</p>
      </Modal>
    </section>
  );
};

export default Article;
