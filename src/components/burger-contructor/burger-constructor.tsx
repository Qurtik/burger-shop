import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import ContructorWidget from './constructor-widget/constructor-widget';
import OrderDetails from './order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.burger_constructor_page}  pt-25`}>
      <section className={`${styles.burger_constructor_widgets}`}>
        <ContructorWidget ingredients={ingredients} />
      </section>

      <div className={`${styles.burger_constructor_footer} pt-10`}>
        <span className="text text_type_digits-medium">
          0 <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      <OrderDetails isOpen={isOpen} onClose={() => setIsOpen(false)} orderNum={123456} />
    </div>
  );
};
