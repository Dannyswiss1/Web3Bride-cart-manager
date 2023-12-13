// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";

// function App() {
// return (
// <div className="App">

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.amount.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

const ShoppingCart = ({
  cart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
}) => {
  const totalAmount = cart.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x{item.quantity} - ${item.amount.toFixed(2)}
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <input type="text" placeholder="Enter coupon code" id="couponInput" />
      <button
        onClick={() =>
          applyCoupon(document.getElementById("couponInput").value)
        }
      >
        Apply Coupon
      </button>
    </div>
  );
};

const App = () => {
  const initialProducts = [
    { id: 1, name: "Product 1", amount: 10.0 },
    // Add more products here
  ];

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const totalAmount = cart.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(newQuantity, 0) }
        : item
    );

    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const applyCoupon = (couponCode) => {
    if (couponCode === "WEB3BRIDGECOHORTx") {
      const discount = totalAmount * 0.1;
      const discountedTotal = totalAmount - discount;
      updateQuantity("coupon", 1); // Add a virtual item for the coupon
      setCart([
        ...cart,
        { id: "coupon", name: "Discount", amount: -discount, quantity: 1 },
      ]);
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  };

  return (
    <div>
      <h1>React Shopping Cart</h1>
      <ProductList products={products} addToCart={addToCart} />
      <ShoppingCart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        applyCoupon={applyCoupon}
      />
    </div>
  );
};

// export default App;

//     </div>
//    );
// }

export default App;
