import useInput from "../../hooks/useInput";

import styles from "./AddMealForm.module.css";

const AddItemForm = (props) => {
  const nameValidity = (value) => {
    return value.trim().length > 0;
  };

  const desValidity = (value) => {
    return value.trim().length > 10;
  };

  const priceValidity = (value) => {
    return value.trim().length > 0;
  };

  const {
    hasError: nameHasError,
    value: name,
    isValid: nameIsValid,
    inputResetHandler: nameResetHandler,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(nameValidity);

  const {
    hasError: desHasError,
    value: description,
    isValid: desIsValid,
    inputResetHandler: desResetHandler,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: desInputBlurHandler,
  } = useInput(desValidity);

  const {
    hasError: priceHasError,
    value: price,
    isValid: priceIsValid,
    inputResetHandler: priceResetHandler,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceInputBlurHandler,
  } = useInput(priceValidity);

  let formIsValid = false;

  if (nameIsValid && desIsValid && priceIsValid) {
    formIsValid = true;
  }

  let mealProduct;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    mealProduct = {
      name,
      description,
      price,
    };

    props.onAddMeal(mealProduct);

    nameResetHandler();
    desResetHandler();
    priceResetHandler();
  };

  return (
    <div>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles.control}>
          <label htmlFor="meal">Meal Name</label>
          <input
            type="text"
            id="meal"
            onChange={nameChangeHandler}
            onBlur={nameInputBlurHandler}
            value={name}
          />
          {nameHasError && <p className={styles.error}>Enter a valid name</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={descriptionChangeHandler}
            onBlur={desInputBlurHandler}
            value={description}
          />
          {desHasError && (
            <p className={styles.error}>
              Description should be 10 - 50 characters long
            </p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            onChange={priceChangeHandler}
            onBlur={priceInputBlurHandler}
            value={price}
          />
          {priceHasError && <p className={styles.error}>Enter a valid price</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onHide}>
            Cancel
          </button>
          <button className={styles.submit} disabled={!formIsValid}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
