import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { string } from 'yup';

import { createArticleThunk } from '../../redux/createartical-reducer';
import Loader from '../loader/loader';
import { useAppDispatch } from '../../often';

import classes from './new-article.module.scss';
import schema from './schema';

interface Tag {
  tag: string;
}

interface FormData {
  title: string;
  description: string;
  text: string;
  tagList: Tag[];
}

const NewArticle: React.FC = () => {
  const isLoading = useSelector((state: any) => state.myArticle.isCreatingLoading);
  const createdArticle = useSelector((state: any) => state.myArticle.article);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  });

  const userToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : undefined;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data: FormData) => {
    const tagsList = data.tagList.map((tag) => tag.tag);
    const article = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: tagsList,
      token: userToken,
      slug: typeof string,
    };
    dispatch(createArticleThunk(article));
    reset();
  };

  useEffect(() => {
    if (createdArticle) {
      navigate('/');
    }
  }, [createdArticle, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes['article-form-container']}>
      <form className={classes['article-form']} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={classes['article-form__header']}>Create new article</h5>
        <label className={classes['article-form__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          <input {...register('title')} className={classes['article-form__input']} placeholder="Title" type="text" />
          <div className={classes['article-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['article-form__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          <input
            {...register('description')}
            className={classes['article-form__input']}
            placeholder="Description"
            type="text"
          />
          <div className={classes['article-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['article-form__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          <textarea {...register('text')} className={classes['article-form__textarea']} placeholder="Text" />
          <div className={classes['article-form__validation-error']}>{errors?.text?.message}</div>
        </label>
        <div className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={classes['article-form__single-tag']}>
                <Controller
                  render={({ field }) => (
                    <input
                      {...register(`tagList.${index}.tag`)}
                      className={classes['article-form__tag-input']}
                      {...field}
                    />
                  )}
                  name={`tagList.${index}.tag`}
                  control={control}
                />
                {fields.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={classes['article-form__delete-button']}
                  >
                    Delete
                  </button>
                )}
                {fields.length - 1 === index && (
                  <button
                    className={classes['article-form__add-button']}
                    type="button"
                    onClick={() => append({ tag: '' })}
                  >
                    Add tag
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className={classes['article-form__button']} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
