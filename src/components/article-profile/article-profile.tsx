import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';

import { fetchArticleThunk, likeArticleThunk } from '../../redux/article-reducer';
import { useAppDispatch } from '../../often';

import classes from './article-profile.module.scss';

interface Articlal {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  tagList: string[];
  favoritesCount: number;
  author: {
    username: string;
    image: string;
  };
}

interface ArticleProfileProps {
  article: Articlal;
}

const ArticleProfile: React.FC<ArticleProfileProps> = ({ article }) => {
  const { slug } = article;
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const cutTitle = (title: string): string => {
    if (title.length > 40) {
      return `${title.split('').slice(0, 40).join('')}...`;
    }
    return title;
  };

  const cutDescription = (description: string): string => {
    if (description.length > 150) {
      return `${description.split('').slice(0, 150).join('')}...`;
    }
    return description;
  };

  const handleClick = () => {
    dispatch(fetchArticleThunk(slug));
  };

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem(`liked_${slug}`) || 'false');
    if (liked !== null) {
      setIsLiked(liked);
    }
  }, [slug]);

  const handleLike = () => {
    const newFavoritedStatus = !isLiked;
    setIsLiked(newFavoritedStatus);
    localStorage.setItem(`liked_${slug}`, JSON.stringify(newFavoritedStatus));
    dispatch(likeArticleThunk({ slug: article.slug, favorited: newFavoritedStatus }));
  };

  const { Text } = Typography;

  const tags = article.tagList
    ? article.tagList.map((tag) => (
        <Text code key={nanoid()}>
          {tag}
        </Text>
      ))
    : [];

  const updatedFavoritesCount = isLiked ? article.favoritesCount + 1 : article.favoritesCount;
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');
  const { image, username } = article.author;
  const title = cutTitle(article.title);
  const description = cutDescription(article.description);

  return (
    <li className={classes['article-profile']}>
      <section className={classes['article-profile__text']}>
        <div className={classes['article-profile__header']}>
          <Link to={`/articles/${slug}`} className={classes['article-profile__title']} onClick={handleClick}>
            {title}
          </Link>
          <button type="button" className={classes['article-profile__likes']} onClick={handleLike}>
            <span className={classes['article-profile__like']}>{isLiked ? '❤️' : '🤍'}</span>
            <span className={classes['article-profile__count']}>{updatedFavoritesCount}</span>
          </button>
        </div>
        <div className={classes['article-profile__tags']}>{tags}</div>
        <div className={classes['article-profile__article-text']}>{description}</div>
      </section>
      <section className={classes['article-profile__author']}>
        <div className={classes['article-profile__name-date']}>
          <div className={classes['article-profile__author-name']}>{username}</div>
          <div className={classes['article-profile__date-of-creation']}>{creationDate}</div>
        </div>
        <img
          src={image || 'default-avatar.png'}
          alt="Author avatar"
          className={classes['article-profile__author-avatar']}
        />
      </section>
    </li>
  );
};

export default ArticleProfile;
