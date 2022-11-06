import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimate, setBtnAnimate] = useState(false);

  const cartCtx = useContext(CartContext);

  let buttonClasses = `${classes.button} ${btnAnimate ? classes.bump : ""}`;

  const items = cartCtx.items;

  useEffect(() => {
    if (items.length > 0) {
      setBtnAnimate(true);
    }

    const timer = setTimeout(() => {
      setBtnAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  return (
    <button className={buttonClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
