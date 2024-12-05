import { SpinnerDotted } from 'spinners-react';
import React from 'react';

import classes from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={classes.loader}>
      <SpinnerDotted color="#2196F3" />
      <p className={classes.loading__text}>Загрузка постов...</p>
    </div>
  );
};

export default Loader;
