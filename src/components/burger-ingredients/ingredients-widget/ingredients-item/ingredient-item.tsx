import {
  // Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
// import { useState } from 'react';

import type { TIngredient } from '@/utils/types';

type Props = TIngredient;

import IngredientDetails from '../ingredients-detailts/ingredient-details';

import style from './ingredient-item.module.css';

const IngredientItem = (props: Props): React.JSX.Element => {
  // const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = (): void => {
    setIsOpen(!isOpen);
  };

  // const increment = (): void => {
  // 	setCount((count: number) => {
  // 		return (count = count + 1);
  // 	});
  // };

  return (
    // <div className={`${style.card} pt-6 pl-4`}>
    <>
      <div className={`${style.card}`} onClick={toggleModal}>
        <img
          className={`${style.card_image} ml-4 mr-4`}
          alt="Наименование булки"
          src={props.image}
        />
        <div className={`${style.card_price} pt-1`}>
          <span className="text text_type_digits-default">{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        {/* {count > 0 ? (
					<Counter count={0} size="default" extraClass={style.card_count} />
				) : (
					''
				)} */}
        <span className={`text text_type_main-default pt-1`}>{props.name}</span>
      </div>

      <IngredientDetails isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />
    </>
  );
};

export default IngredientItem;
