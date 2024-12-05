import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().required('Required filed').trim(),
  description: yup.string().required('Required field').trim(),
  text: yup.string().required('Required field').trim(),
});
