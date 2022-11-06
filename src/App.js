import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import AddItem from "./components/Meals/AddMeal";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);
  const [itemFormShown, setItemFormShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  const showItemFormHandler = () => {
    setItemFormShown(true);
  };

  const hideItemFormHandler = () => {
    setItemFormShown(false);
  };

  return (
    <CartProvider>
      <Header onShow={showCartHandler} onShowForm={showItemFormHandler} />
      {itemFormShown && <AddItem onHide={hideItemFormHandler} />}
      <Meals />
      {cartShown && <Cart onHide={hideCartHandler} />}
    </CartProvider>
  );
}

export default App;
