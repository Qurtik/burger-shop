import Modal from '@/components/shared/modal/modal';
import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  orderNum: number;
};

const OrderDetails = (props: TProps): React.JSX.Element => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <h2 className="text text_type_digits-medium">{props.orderNum}</h2>
      <p>Идентификатор заказа</p>
      <CheckMarkIcon type="primary" className={styles.modal_check_mark} />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
};

export default OrderDetails;
