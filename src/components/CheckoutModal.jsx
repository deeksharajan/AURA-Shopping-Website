import React, { useState } from 'react'
 
const STEPS = [
  { key: 'address', label: 'Shipping Address' },
  { key: 'payment', label: 'Payment Method' },
  { key: 'review', label: 'Review Order' }
]
 
export default function CheckoutModal({
  isCheckoutOpen,
  setIsCheckoutOpen,
  cart,
  cartSubtotal,
  onPlaceOrder
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [errors, setErrors] = useState({})
 
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    zip: ''
  })
 
  const [payment, setPayment] = useState({
    method: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
 
  if (!isCheckoutOpen) return null
 
  const resetAndClose = () => {
    setIsCheckoutOpen(false)
    setOrderPlaced(false)
    setStepIndex(0)
    setErrors({})
    setAddress({ fullName: '', phone: '', addressLine: '', city: '', state: '', zip: '' })
    setPayment({ method: 'card', cardName: '', cardNumber: '', expiry: '', cvv: '' })
  }
 
  const updateAddress = (field) => (e) => setAddress((p) => ({ ...p, [field]: e.target.value }))
  const updatePayment = (field) => (e) => setPayment((p) => ({ ...p, [field]: e.target.value }))
 
  const validateAddress = () => {
    const next = {}
    if (!address.fullName.trim()) next.fullName = 'Enter your full name'
    if (!address.phone.trim()) next.phone = 'Enter a phone number'
    if (!address.addressLine.trim()) next.addressLine = 'Enter your street address'
    if (!address.city.trim()) next.city = 'Enter your city'
    if (!address.state.trim()) next.state = 'Enter your state'
    if (!address.zip.trim()) next.zip = 'Enter your ZIP code'
    setErrors(next)
    return Object.keys(next).length === 0
  }
 
  const validatePayment = () => {
    if (payment.method !== 'card') return true
    const next = {}
    if (!payment.cardName.trim()) next.cardName = 'Enter the name on card'
    if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ''))) next.cardNumber = 'Enter a valid card number'
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) next.expiry = 'Use MM/YY'
    if (!/^\d{3,4}$/.test(payment.cvv)) next.cvv = 'Enter a valid CVV'
    setErrors(next)
    return Object.keys(next).length === 0
  }
 
  const goNext = () => {
    if (stepIndex === 0 && !validateAddress()) return
    if (stepIndex === 1 && !validatePayment()) return
    setErrors({})
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }
 
  const goBack = () => {
    setErrors({})
    setStepIndex((i) => Math.max(i - 1, 0))
  }
 
  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    if (onPlaceOrder) onPlaceOrder({ address, payment })
  }
 
  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn modal-close-corner" onClick={resetAndClose} aria-label="Close Checkout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
 
        {!orderPlaced && (
          <div className="checkout-steps-rail">
            {STEPS.map((step, idx) => (
              <div
                key={step.key}
                className={`checkout-step-item ${idx === stepIndex ? 'active' : ''} ${idx < stepIndex ? 'completed' : ''}`}
              >
                <span className="checkout-step-circle">{idx < stepIndex ? '✓' : idx + 1}</span>
                <span className="checkout-step-label">{step.label}</span>
              </div>
            ))}
          </div>
        )}
 
        <div className="checkout-content">
          {orderPlaced ? (
            <OrderConfirmation
              address={address}
              cartCount={cart.length}
              cartSubtotal={cartSubtotal}
              onDone={resetAndClose}
            />
          ) : stepIndex === 0 ? (
            <AddressStep address={address} updateAddress={updateAddress} errors={errors} onNext={goNext} />
          ) : stepIndex === 1 ? (
            <PaymentStep
              payment={payment}
              setPayment={setPayment}
              updatePayment={updatePayment}
              errors={errors}
              onNext={goNext}
              onBack={goBack}
            />
          ) : (
            <ReviewStep
              address={address}
              payment={payment}
              cart={cart}
              cartSubtotal={cartSubtotal}
              onBack={goBack}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </div>
      </div>
    </div>
  )
}
 
function Field({ label, value, onChange, error, placeholder, span }) {
  return (
    <div className={span ? 'field-full' : ''}>
      <label className="checkout-field-label">{label}</label>
      <input
        type="text"
        className={`checkout-input ${error ? 'has-error' : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className="checkout-field-error">{error}</span>}
    </div>
  )
}
 
function AddressStep({ address, updateAddress, errors, onNext }) {
  return (
    <>
      <h3 className="checkout-section-title">Shipping Address</h3>
      <div className="checkout-form-grid">
        <Field label="Full Name" value={address.fullName} onChange={updateAddress('fullName')} error={errors.fullName} />
        <Field label="Phone Number" value={address.phone} onChange={updateAddress('phone')} error={errors.phone} />
        <Field
          label="Address"
          value={address.addressLine}
          onChange={updateAddress('addressLine')}
          error={errors.addressLine}
          placeholder="Street and house number"
          span
        />
        <Field label="City" value={address.city} onChange={updateAddress('city')} error={errors.city} />
        <Field label="State" value={address.state} onChange={updateAddress('state')} error={errors.state} />
        <Field label="ZIP Code" value={address.zip} onChange={updateAddress('zip')} error={errors.zip} />
      </div>
      <div className="checkout-nav-row">
        <span />
        <button className="checkout-btn-primary" onClick={onNext}>Use this address</button>
      </div>
    </>
  )
}
 
function PaymentStep({ payment, setPayment, updatePayment, errors, onNext, onBack }) {
  return (
    <>
      <h3 className="checkout-section-title">Payment Method</h3>
      <div className="payment-method-grid">
        <label className={`payment-method-option ${payment.method === 'card' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="payment-method"
            checked={payment.method === 'card'}
            onChange={() => setPayment((p) => ({ ...p, method: 'card' }))}
          />
          Credit or Debit Card
        </label>
        <label className={`payment-method-option ${payment.method === 'cod' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="payment-method"
            checked={payment.method === 'cod'}
            onChange={() => setPayment((p) => ({ ...p, method: 'cod' }))}
          />
          Cash on Delivery
        </label>
      </div>
 
      {payment.method === 'card' && (
        <div className="checkout-form-grid" style={{ marginTop: '0.5rem' }}>
          <Field label="Name on Card" value={payment.cardName} onChange={updatePayment('cardName')} error={errors.cardName} span />
          <Field
            label="Card Number"
            value={payment.cardNumber}
            onChange={updatePayment('cardNumber')}
            error={errors.cardNumber}
            placeholder="0000 0000 0000 0000"
            span
          />
          <Field label="Expiry (MM/YY)" value={payment.expiry} onChange={updatePayment('expiry')} error={errors.expiry} placeholder="MM/YY" />
          <Field label="CVV" value={payment.cvv} onChange={updatePayment('cvv')} error={errors.cvv} placeholder="123" />
        </div>
      )}
 
      <div className="checkout-nav-row">
        <button className="checkout-btn-secondary" onClick={onBack}>Back</button>
        <button className="checkout-btn-primary" onClick={onNext}>Continue</button>
      </div>
    </>
  )
}
 
function ReviewStep({ address, payment, cart, cartSubtotal, onBack, onPlaceOrder }) {
  return (
    <>
      <h3 className="checkout-section-title">Review Your Order</h3>
 
      <div className="review-order-card">
        <div className="review-order-section">
          <div className="review-order-label">Shipping to</div>
          <div className="review-order-value">
            {address.fullName} · {address.addressLine}, {address.city}, {address.state} {address.zip}
          </div>
        </div>
        <div className="review-order-section">
          <div className="review-order-label">Payment</div>
          <div className="review-order-value">
            {payment.method === 'card'
              ? `Card ending in ${payment.cardNumber.slice(-4) || '••••'}`
              : 'Cash on Delivery'}
          </div>
        </div>
        <div className="review-order-section">
          <div className="review-order-label">Items ({cart.length})</div>
          {cart.map((item) => (
            <div className="review-line-item" key={`${item.id}-${item.size}`}>
              <img src={item.image} alt={item.name} />
              <div>
                <div className="review-line-item-name">{item.name}</div>
                <div className="review-line-item-meta">Size: {item.size} · Qty: {item.quantity}</div>
              </div>
              <span className="review-line-item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="review-order-section">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>Complimentary</span>
          </div>
          <div className="summary-row summary-total">
            <span>Order Total</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
 
      <div className="checkout-nav-row">
        <button className="checkout-btn-secondary" onClick={onBack}>Back</button>
        <button className="checkout-btn-primary" onClick={onPlaceOrder}>Place Your Order</button>
      </div>
    </>
  )
}
 
function OrderConfirmation({ address, cartCount, cartSubtotal, onDone }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <div className="order-confirm-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="checkout-section-title" style={{ marginBottom: '0.5rem' }}>Order placed!</h3>
      <p className="modal-desc">
        Thanks{address.fullName ? `, ${address.fullName.split(' ')[0]}` : ''} — your {cartCount} item(s)
        totaling ${cartSubtotal.toFixed(2)} are on their way. A confirmation has been sent for your records.
      </p>
      <button className="checkout-btn-primary" style={{ marginTop: '1rem' }} onClick={onDone}>
        Continue Shopping
      </button>
    </div>
  )
}
 