/* eslint-disable prettier/prettier */

import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import IngredientWidget from './ingredients-widget/ingredient-widget';

import type { TIngredient } from '@utils/types';
import type React from 'react';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [current, setCurrent] = useState('bun');

	const containerRef = useRef<HTMLDivElement>(null);
	const isScrolling = useRef(false);

	const observerOptions = {
		root: containerRef.current,
		threshold: 0.1,
		rootMargin: '0px 0px -70% 0px',
	};

	const [bunRef, bunInView] = useInView(observerOptions);
	const [mainRef, mainInView] = useInView(observerOptions);
	const [sauceRef, sauceInView] = useInView(observerOptions);

	const changeTab = (value: string): void => {
		isScrolling.current = true;
		setCurrent(value);

		const sectionId = `${value}-section`;
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}

		setTimeout(() => {
			isScrolling.current = false;
		}, 1000);
	};

	// Автоматическое переключение табов при прокрутке
	useEffect(() => {
		if (isScrolling.current) return;

		if (bunInView) setCurrent('bun');
		else if (sauceInView) setCurrent('sauce');
		else if (mainInView) setCurrent('main');
	}, [bunInView, sauceInView, mainInView]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value="bun" active={current === 'bun'} onClick={changeTab}>
						Булки
					</Tab>
					<Tab value="main" active={current === 'main'} onClick={changeTab}>
						Начинки
					</Tab>
					<Tab value="sauce" active={current === 'sauce'} onClick={changeTab}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div className={styles.ingredient_widgets} ref={containerRef}>
				<div id="bun-section" ref={bunRef}>
					<h2 className="text text_type_main-medium">Булки</h2>
					<IngredientWidget ingredients={ingredients} itemType="bun" />
				</div>
				<div id="main-section" ref={mainRef}>
					<h2 className="text text_type_main-medium">Начинки</h2>
					<IngredientWidget ingredients={ingredients} itemType="main" />
				</div>
				<div id="sauce-section" ref={sauceRef}>
					<h2 className="text text_type_main-medium">Соусы</h2>
					<IngredientWidget ingredients={ingredients} itemType="sauce" />
				</div>
			</div>
		</section>
	);
};
