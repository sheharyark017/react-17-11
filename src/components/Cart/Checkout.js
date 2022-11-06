import useInput from "../../hooks/useInput";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const inputValidation = (value) => {
    return value.trim().length > 0;
  };

  const postalValidation = (value) => {
    return value.trim().length === 5;
  };

  const {
    value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    inputBlurHandler: nameBlurHandler,
    inputResetHandler: nameResetHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput(inputValidation);

  const {
    value: city,
    hasError: cityHasError,
    isValid: cityIsValid,
    inputBlurHandler: cityBlurHandler,
    inputResetHandler: cityResetHandler,
    valueChangeHandler: cityChangeHandler,
  } = useInput(inputValidation);

  const {
    value: street,
    hasError: streetHasError,
    isValid: streetIsValid,
    inputBlurHandler: streetBlurHandler,
    inputResetHandler: streetResetHandler,
    valueChangeHandler: streetChangeHandler,
  } = useInput(inputValidation);

  const {
    value: postal,
    hasError: postalHasError,
    isValid: postalIsValid,
    inputBlurHandler: postalBlurHandler,
    inputResetHandler: postalResetHandler,
    valueChangeHandler: postalChangeHandler,
  } = useInput(postalValidation);

  let formIsValid;

  if (nameIsValid && cityIsValid && streetIsValid && postalIsValid) {
    formIsValid = true;
  }

  let formDetails;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    formDetails = {
      name,
      city,
      street,
      postal,
    };

    props.onConfirm(formDetails);

    nameResetHandler();
    cityResetHandler();
    streetResetHandler();
    postalResetHandler();
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={styles.control}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={styles.error}>Please enter a valid name</p>
        )}
      </div>
      <div className={styles.control}>
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <p className={styles.error}>Please enter a valid name</p>
        )}
      </div>
      <div className={styles.control}>
        <label>Street</label>
        <input
          type="text"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className={styles.error}>Please enter a valid name</p>
        )}
      </div>
      <div className={styles.control}>
        <label>Postal Code</label>
        <input
          type="text"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className={styles.error}>Please enter a valid name</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onHide}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
