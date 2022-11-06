import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, fetchData: fetchMeals } = useFetch();

  useEffect(() => {
    const fetchConfig = {
      url: "https://react-17-3dcff-default-rtdb.firebaseio.com/meals.json",
    };

    const transformMeals = (meals) => {
      const loadedMeals = [];

      for (const key in meals) {
        loadedMeals.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(fetchConfig, transformMeals);
  }, [fetchMeals]);

  const mealslist = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={styles.meals}>
      <Card>
        {!error && isLoading && (
          <div className={styles.loading}>
            <span></span>
          </div>
        )}
        {!error && !isLoading && <ul>{mealslist}</ul>}
        {error && <p className={styles.error}>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
