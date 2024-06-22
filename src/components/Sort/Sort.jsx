import React from 'react';

import classes from './Sort.module.scss';

export default function Sort() {
  const sortsName = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'];
  return (
    <div className={classes.sort}>
      {sortsName.map((sort) => {
        return (
          <button type="button" key={sort} className={classes['sort-item']}>
            {sort}
          </button>
        );
      })}
    </div>
  );
}
