import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import Modal from '../shared/modal/modal';
import { useModal } from '../shared/modal/useModal';
import ContructorWidget from './constructor-widget/constructor-widget';
import OrderDetails from './order-details/order-details';

import type { TIngredient } from '@utils/types';
import type React from 'react';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOpen, setIsOpen, setIsClose] = useModal();

  const handleOpen = (): void => {
    setIsOpen();
  };

  const handleClose = (): void => {
    setIsClose();
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
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpen}>
          Оформить заказ
        </Button>
      </div>

      {isOpen && (
        <Modal onClose={handleClose}>
          <OrderDetails orderNum={123456} />
        </Modal>
      )}
    </div>
  );
};
