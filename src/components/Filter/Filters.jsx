import React from 'react';

import classes from './Filters.module.scss';

export default function Filters() {
  const filtersName = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  return (
    <div className={classes.aside}>
      <h3 className={classes['filters-title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <ul className={classes.filters}>
        {filtersName.map((filter) => {
          return (
            <li key={filter} className={classes.filter}>
              <input type="checkbox" name="checkbox" id={filter} className={classes['checkbox-custom']} />
              <label htmlFor={filter}>{filter}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
