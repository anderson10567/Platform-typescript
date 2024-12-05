import * as yup from 'yup';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const schema = yup.object().shape({
  username: yup
    .string()
    .required('Required field')
    .trim()
    .min(3, 'Username needs to be at least 3 characters')
    .max(20, 'Username nedds to be less than 20 characters'),
  email: yup.string().required('Required field').trim().matches(emailRegExp, 'Wrong email format'),
  password: yup
    .string()
    .required('Required field')
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your pasword needs to ba less than 40 characters'),
  repeatPassword: yup
    .string()
    .required('Required field')
    .trim()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your pasword needs to ba less than 40 characters'),
  tandc: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});
