import React from 'react'

export default function OrderHistory({ orders, onGoHome }) {
  return (
    <section className="order-history-page">
      <div className="page-header">
        <button className="back-to-top" onClick={onGoHome}>Back to shopping</button>
        <div>
          <h1>Order History</h1>
          <p>Review your past purchases and order details.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any orders yet.</p>
          <p>Once you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <span className="order-number">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.date).toLocaleString()}</span>
                </div>
                <span className="order-total">${order.total.toFixed(2)}</span>
              </div>

              <div className="order-meta">
                <div>Items: {order.cart.length}</div>
                <div>Customer: {order.customerDetails.fullName || 'Guest'}</div>
              </div>

              <div className="order-items">
                {order.cart.map((item) => (
                  <div className="order-item" key={`${item.id}-${item.size}`}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <div className="order-item-name">{item.name}</div>
                      <div className="order-item-meta">Size: {item.size} · Qty: {item.quantity}</div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
