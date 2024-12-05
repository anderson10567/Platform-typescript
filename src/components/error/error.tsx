import { Alert } from 'antd';
import React from 'react';

import classes from './error.module.scss';

const Error = () => {
  return (
    <div className={classes.error}>
      <Alert message="Fetch Error" description="OOPS! Something wrong happened! Try again! " type="error" closable />
    </div>
  );
};

export default Error;
