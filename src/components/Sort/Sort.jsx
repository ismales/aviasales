import { useDispatch, useSelector } from 'react-redux';
import { setSortValue } from '../../store/ticketsSlice';

import classes from './Sort.module.scss';

export default function Sort() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.tickets.sortValue);

  const sortNames = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'];
  return (
    <div className={classes.sort}>
      {sortNames.map((sort) => (
        <button
          type="button"
          key={sort}
          className={classes['sort-item']}
          style={isActive === sort ? { color: 'white', backgroundColor: '#2196f3' } : null}
          onClick={() => dispatch(setSortValue({ sort }))}
        >
          {sort}
        </button>
      ))}
    </div>
  );
}
