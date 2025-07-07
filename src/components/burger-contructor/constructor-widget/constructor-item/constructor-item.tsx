import { TIngredient } from "@/utils/types"
import { CurrencyIcon, DragIcon, LockIcon } from "@krgaa/react-developer-burger-ui-components"

import styles from "./constructor-item.module.css"

const ContructorItem = (props: TIngredient) => {
	return (
		<div className={styles.card}>
			<div>
			<DragIcon type="primary" />
			</div>
			<div className={styles.card_body}>
				<img className={styles.card_image} alt="Изображение компонента" src={props.image} />
				<span className={styles.card_item_name}>{props.name}</span>
				<div className={styles.card_price}>
					<span className="text text_type_digits-default">
						{props.price}
					</span>
					<CurrencyIcon type="primary" />
				</div>

				<span>
					<LockIcon type="primary" />
				</span>
			</div>
		</div>
	)
}

export default ContructorItem