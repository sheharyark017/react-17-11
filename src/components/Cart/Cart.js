import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [showCheckout, setShowCheckout] = useState(false);

  const { isLoading, requestDone, error, fetchData: fetchOrders } = useFetch();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const showCheckoutHandler = () => {
    setShowCheckout(true);
  };

  const hideCheckoutHandler = () => {
    setShowCheckout(false);
  };

  const submitOrderHandler = (userData) => {
    fetchOrders(
      {
        url: "https://react-17-3dcff-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: userData,
          orderedItems: cartCtx.items,
        },
      },
      () => {}
    );
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
          name={item.name}
          amount={item.amount}
          price={item.price}
          id={item.id}
          key={item.id}
        />
      ))}
    </ul>
  );

  const cartButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={showCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <React.Fragment>
      <div>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </div>
      {!showCheckout && cartButtons}
      <div>
        {hasItems && showCheckout && (
          <Checkout
            onshow={showCheckoutHandler}
            onHide={hideCheckoutHandler}
            onConfirm={submitOrderHandler}
          />
        )}
      </div>
    </React.Fragment>
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

  if (requestDone && !error) {
    cartCtx.clearCart();
  }

  return (
    <Modal onHide={props.onHide}>
      {!isLoading && !error && !requestDone && cartContent}
      {isLoading && !error && isSubmitting}
      {requestDone && !error && !isLoading && submitted}
      {error && hasError}
    </Modal>
  );
};

export default Cart;
