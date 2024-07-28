import { createContext, useContext, useEffect, useState } from "react";
import Shoppinh_Cart from "../Components/Shopping_Cart_Components/Shopping_Cart";
import { Auth_Context } from "./Auth_Context";

export const Shopping_Context = createContext({});

const user_id = JSON.parse(localStorage.getItem('user'))?.id;

const starting_CrtItems_value = localStorage.getItem(`Shopping_Items${user_id}`) ? JSON.parse(localStorage.getItem(`Shopping_Items${user_id}`)) : [];

const Shopping_Provider = (props) => {

  
  
  // To set side cart menu state opne or close
  const [isOpen, setIsOpen] = useState(false);

  // To opne side cart menu
  const openSideCart = () => {
    setIsOpen(true);
  };

  // To close side cart menu
  const closeSideCart = () => {
    setIsOpen(false);
  };

  // To store cart items
  const [cartItems, setCartItems] = useState(starting_CrtItems_value);

  
  useEffect(()=>{

    localStorage.setItem(`Shopping_Items${user_id}`,JSON.stringify(cartItems));

  },[cartItems]);

  /**
   * @param {quantity} quantity is quantity of products
   * @param {item} item is product in cart and item.quantity is number of copies of product
   * @return {number} The quantity of products in cart
   */
  // Get product quantity in cart
  const cartQuantity = cartItems.reduce((quantity, item)=>
    item.quantity + quantity
  ,0);

  // Get items quantity in cart
  const getItemsQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // Increase item quantity in cart
  const increaseItemsQuantity = (id) => {
    // Set items quantity in cart
    setCartItems((currItems) => {
      // Check if the item is already in the cart or not
      if (currItems.find((item) => item.id === id) == null) {
        // If not in the cart return quantity: 1
        return [...currItems, { id, quantity: 1 }];
      } else {
        // If in cart:
        return currItems.map((item) => {
          if (item.id === id) {
            // Return quantity: old quantity + 1
            return { ...item, quantity: item.quantity + 1 };
          } else {
            // Return quantity: old quantity
            return item;
          }
        });
      }
    });
  };

  // decrease item quantity in cart
  const decreaseItemsQuantity = (id) => {
    // Set items quantity in cart
    setCartItems((currItems) => {
      // Check if the item is in the cart or not
      if (currItems.find((item) => item.id === id) == null) {
        // If not in the cart remove it from the state
        return currItems.filter((item) => item.id !== id);
      } else {
        // If in cart:
        return currItems.map((item) => {
          if (item.id === id) {
            // Return quantity: old quantity - 1
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Return quantity: old quantity
            return item;
          }
        });
      }
    });
  };

  // Remove item from cart
  const removeItemFromCart = (id) => {
    // Return all items without the removerd item
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <Shopping_Context.Provider
      value={{
        cartItems,
        setCartItems,
        getItemsQuantity,
        increaseItemsQuantity,
        decreaseItemsQuantity,
        removeItemFromCart,
        closeSideCart,
        openSideCart,
        cartQuantity
      }}
    >
      {props.children}
      <Shoppinh_Cart isOpen={isOpen} />
    </Shopping_Context.Provider>
  );
};

export default Shopping_Provider;
