//eslint-disable no-useless-escape */
import * as yup from 'yup';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegExp = /^(https?|ftp):\/\/(([a-zA-Z0-9\-.]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/;

export const schema = yup.object().shape({
  username: yup.string().required('Required field').trim(),
  email: yup.string().required('Required field').matches(emailRegExp, 'Wrong email format'),
  password: yup
    .string()
    .required('Required field')
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your pasword needs to ba less than 40 characters'),
  avatar: yup.string().matches(urlRegExp, 'Wrong url format'),
});
