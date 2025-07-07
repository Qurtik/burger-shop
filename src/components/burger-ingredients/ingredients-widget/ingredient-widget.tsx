import React from "react"
import { TIngredient } from "@/utils/types";
import IngredientItem from "./ingredients-item/ingredient-item";

import style from './ingredient-widget.module.css'

type TItemBlock  = {
	ingredientWidgetTitle: string,
	itemType: "bun" | "main" | "sauce"
} & {ingredients: TIngredient[];}

const IngredientWidget = ({ingredients, ingredientWidgetTitle, itemType}: TItemBlock): React.JSX.Element=>{
	console.log("ItemBlock - render")

	const items = ingredients.filter(bun => bun.type.toLowerCase() === itemType);

	return (
		<div className="pt-10">
			<p className={`text text_type_main-medium pb-6`}>
				{ingredientWidgetTitle}
			</p>
			<div className={`${style.widgetItems} pl-4`}>
				{
					items.map(item => {
						return (
							<React.Fragment key={item._id}>
								<IngredientItem {...item} />
							</React.Fragment>
						)
					})
				}
			</div>
		</div>
	)
}

export default IngredientWidget