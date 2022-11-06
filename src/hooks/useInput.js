import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const hasError = !isValid && inputIsTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const inputResetHandler = () => {
    setInputIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isValid,
    inputResetHandler,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
  };
};

export default useInput;
