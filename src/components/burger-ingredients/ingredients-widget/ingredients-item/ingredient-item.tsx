import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import type { TIngredient } from '@/utils/types';

import style from './ingredient-item.module.css';

const IngredientItem = (props: TIngredient): React.JSX.Element => {
  const [count, setCount] = useState(0);

  const increment = (): void => {
    setCount((count: number) => {
      return (count = count + 1);
    });
  };

  return (
    // <div className={`${style.card} pt-6 pl-4`}>
    <div className={`${style.card}`} onClick={increment}>
      <img
        className={`${style.card_image} ml-4 mr-4`}
        alt="Наименование булки"
        src={props.image}
      />
      <div className={`${style.card_price} pt-1`}>
        <span className="text text_type_digits-default">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      {count > 0 ? (
        <Counter count={count} size="default" extraClass={style.card_count} />
      ) : (
        ''
      )}
      <span className={`text text_type_main-default pt-1`}>{props.name}</span>
    </div>
  );
};

export default IngredientItem;
