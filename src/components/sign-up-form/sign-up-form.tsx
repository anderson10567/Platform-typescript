import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import React from 'react';

import { createAccountThunk } from '../../redux/account-reducer';
import Loader from '../loader/loader';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../often';

import { schema } from './schema';
import classes from './sign-up-form.module.scss';

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  tandc: boolean;
  name: string;
  token: string;
}

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const creationError = useSelector((state: RootState) => state.account.isCreatingError);
  const loader = useSelector((state: RootState) => state.account.isCreatingLoader);
  const user = useSelector((state: RootState) => state.account.user);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    dispatch(createAccountThunk(data));
    reset();
  };

  if (loader) {
    return <Loader />;
  }

  if (user) {
    navigate('/');
  }

  return (
    <section className={classes['sign-up-container']}>
      <form method="post" className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes['sign-up-form__header']}>Create new account</h3>

        <label className={classes['sign-up-form__username-label']}>
          <p className={classes['sign-up-form__text']}>Username</p>
          <input
            {...register('username')}
            type="text"
            placeholder="Username"
            className={errors.username ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors.username?.message}</div>
        </label>

        <label className={classes['sign-up-form__email-label']}>
          <p className={classes['sign-up-form__text']}>Email address</p>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className={errors.email ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors.email?.message}</div>
        </label>

        <label className={classes['sign-up-form__password-label']}>
          <p className={classes['sign-up-form__text']}>Password</p>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={errors.password ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors.password?.message}</div>
        </label>

        <label className={classes['sign-up-form__repeat-password-label']}>
          <p className={classes['sign-up-form__text']}>Repeat Password</p>
          <input
            {...register('repeatPassword')}
            type="password"
            placeholder="Repeat Password"
            className={errors.repeatPassword ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors.repeatPassword?.message}</div>
        </label>

        <div className={classes['sign-up-form__agreement']}>
          <input type="checkbox" {...register('tandc')} className={classes['sign-up-form__agreement-input']} />
          <span>I agree to the processing of my personal information</span>
        </div>
        <div className={classes['sign-up-form__validation-error']}>{errors.tandc?.message}</div>

        <button type="submit" className={classes['sign-up-form__button']} disabled={!isValid}>
          Create
        </button>

        {creationError && (
          <div className={classes['sign-up-form__validation-error']}>
            Username or email is already taken, try another
          </div>
        )}

        <p className={classes['sign-up-form__notification']}>
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['sign-up-form__link']}>
            Sign In.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
