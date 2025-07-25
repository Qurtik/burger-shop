import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import ContructorItem from './constructor-item/constructor-item';

import type { TIngredient } from '@/utils/types';

import styles from './constructor-widget.module.css';

type ContructorWidgetProps = {
  ingredients: TIngredient[];
};

const ContructorWidget = ({ ingredients }: ContructorWidgetProps): React.JSX.Element => {
  const buns = ingredients.find((bun) => bun.type === 'bun')!;
  const ingredientsWithNoBuns = ingredients.filter((bun) => bun.type !== 'bun');

  return (
    <div className={`${styles.widget} mb-12`}>
      <ConstructorElement
        extraClass="mb-6"
        type="top"
        isLocked={true}
        text={`${buns.name} (верх)`}
        price={buns.price}
        thumbnail={buns.image}
      />
      <div className={`${styles.widgetItems}`}>
        {ingredientsWithNoBuns.map((ingredient) => {
          return <ContructorItem key={ingredient._id} ingredient={ingredient} />;
        })}
      </div>
      <ConstructorElement
        extraClass="mt-6"
        type="bottom"
        isLocked={true}
        text={`${buns.name} (низ)`}
        price={buns.price}
        thumbnail={buns.image}
      />
    </div>
  );
};

export default ContructorWidget;
