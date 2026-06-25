import React from 'react'

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  cartItemCount,
  cartSubtotal,
  handleUpdateQty,
  handleRemoveItem,
  handleCheckout
}) {
  if (!isCartOpen) return null

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <span className="drawer-title">Shopping Bag ({cartItemCount})</span>
          <button className="close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-items-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img className="cart-item-img" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-meta">Size: {item.size} | {item.discount}</span>
                  <div className="cart-item-controls">
                    <div className="qty-selector">
                      <button className="qty-btn" onClick={() => handleUpdateQty(item.id, item.size, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleUpdateQty(item.id, item.size, 1)}>+</button>
                    </div>
                    <button className="remove-item-link" onClick={() => handleRemoveItem(item.id, item.size)}>Remove</button>
                  </div>
                </div>
                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <svg className="empty-cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="48" height="48">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p>Your shopping bag is empty.</p>
            </div>
          )}
        </div>

        <div className="drawer-footer">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: '#22c55e', fontWeight: 600 }}>Complimentary</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
