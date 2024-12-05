import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination, ConfigProvider } from 'antd';

import { RootState } from '../../redux/store';
import { fetchArticlesThunk, articlesReducerSlice } from '../../redux/article-reducer';
import { useAppDispatch } from '../../often';

import classes from './pagination.module.scss';

const Paginations: React.FC = () => {
  const pageTotal = useSelector((state: RootState) => state.articles.articlesCount);
  const currentPage = useSelector((state: RootState) => state.articles.page);
  const dispatch = useAppDispatch();

  const handleChange = (page: number) => {
    dispatch(articlesReducerSlice.actions.changePage(page));
    dispatch(fetchArticlesThunk((page - 1) * 5));
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.pagination}>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: '#EBEEF3',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          current={currentPage}
          total={pageTotal || 0}
          defaultPageSize={5}
          onChange={handleChange}
          showSizeChanger={false}
          align="center"
        />
      </ConfigProvider>
    </div>
  );
};

export default Paginations;
