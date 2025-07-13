import Modal from '@/components/shared/modal/modal';
import React, { useEffect } from 'react';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

type TProps = TIngredient & { isOpen: boolean; onClose: () => void };

const IngredientDetails = (props: TProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(!isOpen);
  }, [props.isOpen]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <h2 className={`${styles.title} text text_type_medium`}>Детали ингридиента</h2>
      <div>
        <img src={props.image} alt="Изображение ингридиента" />
        <p>{props.name}</p>
        {/* <p>Описание</p> */}
      </div>
      <div className={`${styles.footer} text text_type_main-small text_color_inactive`}>
        <div className={styles.footer_item}>
          <div>Каллории, ккал </div>
          <div>{props.calories}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Белки, г </div>
          <div>{props.proteins}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Жиры, г </div>
          <div>{props.fat}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Углеводы, г </div>
          <div>{props.carbohydrates}</div>
        </div>
      </div>
    </Modal>
  );
};

export default IngredientDetails;
