import classes from "./HeaderCartButton.module.css";

const HeaderItemButton = (props) => {
  let buttonClasses = `${classes.button}`;

  return (
    <button className={buttonClasses} onClick={props.onShowForm}>
      <span>Add Item</span>
    </button>
  );
};

export default HeaderItemButton;
