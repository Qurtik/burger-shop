import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type TProps = {
  orderNum: number;
};

const OrderDetails = ({ orderNum }: TProps): React.JSX.Element => {
  return (
    <div className={styles.card}>
      <h2 className="text text_type_digits-large pb-8">{orderNum}</h2>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <div className="mt-15 mb-15">
        <CheckMarkIcon type="primary" className={`${styles.check_mark}`} />
      </div>
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
