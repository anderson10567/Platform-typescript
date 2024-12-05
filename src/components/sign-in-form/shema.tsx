/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';

const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const shema = yup.object().shape({
  email: yup.string().required('Required field').matches(regExpEmail, 'Wrong email format'),
  password: yup
    .string()
    .required('Required field')
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your pasword needs to ba less than 40 characters'),
});
