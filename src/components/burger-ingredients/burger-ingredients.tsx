/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

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
	const sectionRefs = useRef<{
		bun: HTMLDivElement | null;
		sauce: HTMLDivElement | null;
		main: HTMLDivElement | null;
	}>({
		bun: null,
		sauce: null,
		main: null,
	});
	const isScrolling = useRef(false);

	const changeTab = (value: string): void => {
		isScrolling.current = true;
		setCurrent(value);

		// Прокручиваем к нужной секции
		const section = sectionRefs.current[value as keyof typeof sectionRefs.current];
		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}

		// Сброс флага после прокрутки
		setTimeout(() => {
			isScrolling.current = false;
		}, 1000);
	};

	// Настройка Intersection Observer для автоактивации табов
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (isScrolling.current) return;

				// Фильтруем видимые секции
				const visibleSections = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visibleSections.length > 0) {
					// Берем верхнюю видимую секцию
					const topSection = visibleSections[0];
					setCurrent(topSection.target.id);
				}
			},
			{
				root: container,
				threshold: 0.1,
				rootMargin: '0px 0px -90% 0px',
			}
		);

		// Наблюдаем все секции
		Object.values(sectionRefs.current).forEach((section) => {
			if (section) observer.observe(section);
		});

		return (): void => observer.disconnect();
	}, []);

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
				<div id="bun" ref={(el: any) => (sectionRefs.current.bun = el)}>
					<h2 className="text text_type_main-medium">Булки</h2>
					<IngredientWidget ingredients={ingredients} itemType="bun" />
				</div>
				{/* <IngredientWidget
					ingredients={ingredients}
					ingredientWidgetTitle="Булки"
					itemType="bun"
				/> */}
				<div id="main" ref={(el: any) => (sectionRefs.current.main = el)}>
					<h2 className="text text_type_main-medium">Начинки</h2>
					<IngredientWidget ingredients={ingredients} itemType="main" />
				</div>
				{/* <IngredientWidget
					ingredients={ingredients}
					ingredientWidgetTitle="Начинки"
					itemType="main"
				/> */}
				<div id="sauce" ref={(el: any) => (sectionRefs.current.sauce = el)}>
					<h2 className="text text_type_main-medium">Соусы</h2>
					<IngredientWidget ingredients={ingredients} itemType="sauce" />
				</div>
				{/* <IngredientWidget
					ingredients={ingredients}
					ingredientWidgetTitle="Соусы"
					itemType="sauce"
				/> */}
			</div>
		</section>
	);
};
