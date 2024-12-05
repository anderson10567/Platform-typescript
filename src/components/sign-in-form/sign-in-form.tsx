import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { enterAccountThunk } from '../../redux/account-reducer';
import Loader from '../loader/loader';
import { useAppDispatch } from '../../often';

import { shema } from './shema';
import classes from './sign-in-form.module.scss';

interface SignInFormInputs {
  email: string;
  password: string;
  token: string;
}

const SignInForm: React.FC = () => {
  const enteringError = useSelector((state: RootState) => state.account.isEnteringError);
  const enteringLoader = useSelector((state: RootState) => state.account.isEnteringLoader);
  const user = useSelector((state: RootState) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(shema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => {
    dispatch(enterAccountThunk(data));
    reset();
  };

  if (enteringLoader) {
    return <Loader />;
  }

  if (user) {
    navigate('/');
  }

  return (
    <section className={classes['sign-in-section']}>
      <form className={classes['sign-in-form']} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes['sign-in-form__header']}>Sign In</h3>
        <label className={classes['sign-in-form__email-label']}>
          <p className={classes['sign-in-form__text']}>Email address</p>
          <input
            {...register('email')}
            type="email"
            className={errors.email ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Email address"
          />
          <div className={classes['sign-in-form__validation-error']}>{errors?.email?.message}</div>
        </label>
        <label className={classes['sign-in-form__password-label']}>
          <p className={classes['sign-in-form__text']}>Password</p>
          <input
            {...register('password')}
            type="password"
            className={errors.password ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Password"
          />
          <div className={classes['sign-in-form__validation-error']}>{errors?.password?.message}</div>
        </label>
        <button type="submit" className={classes['sign-in-form__button']} disabled={!isValid}>
          Login
        </button>
        {enteringError && <div className={classes['sign-in-form__validation-error']}>Incorrect username or email</div>}
        <p className={classes['sign-in-form__notification']}>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={classes['sign-in-form__link']}>
            Sign Up.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignInForm;
