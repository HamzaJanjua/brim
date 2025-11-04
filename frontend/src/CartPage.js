import React from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="text-orange mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <button className="btn btn-dark" onClick={() => navigate("/dashboard")}>
            Go to Menu
          </button>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>Rs. {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>Rs. {item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: Rs. {total}</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                className="btn btn-success"
                onClick={() => alert("Order placed successfully!")}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
