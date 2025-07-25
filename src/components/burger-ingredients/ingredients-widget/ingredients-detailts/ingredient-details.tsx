import type { TIngredient } from '@/utils/types';
import type React from 'react';

import styles from './ingredient-details.module.css';

type TProps = { currentIngredient: TIngredient };

const IngredientDetails = ({ currentIngredient }: TProps): React.JSX.Element => {
  return (
    <>
      <div className={styles.body}>
        <img src={currentIngredient.image_large} alt="Изображение ингридиента" />
        <p className={`text text_type_main-medium`}>{currentIngredient.name}</p>
      </div>
      <div
        className={`${styles.footer} text text_type_main-default text_color_inactive`}
      >
        <div className={`${styles.footer_item}`}>
          <div>Каллории, ккал </div>
          <div>{currentIngredient.calories}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Белки, г </div>
          <div>{currentIngredient.proteins}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Жиры, г </div>
          <div>{currentIngredient.fat}</div>
        </div>
        <div className={styles.footer_item}>
          <div>Углеводы, г </div>
          <div>{currentIngredient.carbohydrates}</div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
