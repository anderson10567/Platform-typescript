import * as yup from 'yup';

const validationschema = yup.object().shape({
  title: yup.string().required('Required filed').trim(),
  description: yup.string().required('Required field').trim(),
  text: yup.string().required('Required field').trim(),
});

export default validationschema;
