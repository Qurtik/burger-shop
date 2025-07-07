import { TIngredient } from "@/utils/types"
import ContructorItem from "./constructor-item/constructor-item"
import styles from './constructor-widget.module.css'

type ContructorWidgetProps = {
	ingredients: TIngredient[];
}

const ContructorWidget = ({ ingredients }: ContructorWidgetProps) => {
	return (
		<div className={`${styles.widgetItems} mb-12`}>
			{ingredients.map(item => {
				return (
					<ContructorItem key={item._id} {...item} />
				)
			})}
		</div>
	)
}

export default ContructorWidget