import { useEffect, useState } from 'react';

import type { TIngredient } from '@/utils/types';

export const useFetchIngredients = (): {
  isLoading: boolean;
  error: string | null;
  ingredients: TIngredient[];
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);

  useEffect(() => {
    const loadIngredients = (): void => {
      setIsLoading(true);
      setError(null);

      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((data) => {
          if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
          }
          return data.json();
        })
        .then((response: { success: boolean; data: TIngredient[] }) => {
          console.log('response', response);
          if (response.success) {
            setIngredients(response.data);
          }
        })
        .catch((error: Error) => {
          console.error('Ошибка при загрузке ингредиентов:', error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    loadIngredients();
  }, []);

  return {
    isLoading,
    error,
    ingredients,
  };
};
