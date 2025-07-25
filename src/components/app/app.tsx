import { useFetchIngredients } from '../hooks/useFetchIngredients';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { error, isLoading, ingredients } = useFetchIngredients();

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          {!isLoading && !error && (
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor ingredients={ingredients} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
