import React from "react";
import useFetch from "../../hooks/useFetch";
import Modal from "../UI/Modal";
import AddItemForm from "./AddMealForm";
import styles from "./AddMeal.module.css";

const AddMeal = (props) => {
  const { isLoading, error, requestDone, fetchData: sendMeals } = useFetch();

  const addMealHandler = (moive) => {
    sendMeals(
      {
        url: "https://react-17-3dcff-default-rtdb.firebaseio.com/meals.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: moive,
      },
      () => {}
    );
  };

  const addItemContent = (
    <AddItemForm onHide={props.onHide} onAddMeal={addMealHandler} />
  );

  const isSubmitting = (
    <div className={styles.loading}>
      <span></span>
    </div>
  );

  const submitted = (
    <React.Fragment>
      <p className={styles.success}>Successfully send the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHide}>
          Done
        </button>
      </div>
    </React.Fragment>
  );

  const hasError = (
    <React.Fragment>
      <p className={styles.error}>Something went wrong!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHide}>
          Try later
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <Modal onHide={props.onHide}>
        {!isLoading && !error && !requestDone && addItemContent}
        {isLoading && !error && isSubmitting}
        {requestDone && !error && !isLoading && submitted}
        {error && hasError}
      </Modal>
    </div>
  );
};

export default AddMeal;
