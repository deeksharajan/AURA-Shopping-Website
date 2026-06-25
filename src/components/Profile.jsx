import React, { useState } from 'react'

export default function Profile({ isOpen, onClose }) {
  const [name, setName] = useState('Guest User')
  const [email, setEmail] = useState('guest@example.com')

  if (!isOpen) return null

  const handleSave = () => {
    // In a real app you'd persist this to a backend
    onClose && onClose()
  }

  const handleLogout = () => {
    // Placeholder logout flow
    setName('Guest User')
    setEmail('guest@example.com')
    onClose && onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn modal-close-corner" onClick={onClose} aria-label="Close Profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <div className="profile-header">
            <div className="profile-avatar">G</div>
            <div className="profile-meta">
              <div className="profile-name">{name}</div>
              <div className="profile-email">{email}</div>
            </div>
          </div>

          <div className="checkout-content" style={{ padding: '1.25rem 1.5rem' }}>
            <h3 className="checkout-section-title">Account Details</h3>
            <p className="modal-desc">Manage your account information and preferences.</p>

            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              <label className="checkout-field-label">Full name</label>
              <input className="checkout-input" value={name} onChange={(e) => setName(e.target.value)} />

              <label className="checkout-field-label">Email</label>
              <input className="checkout-input" value={email} onChange={(e) => setEmail(e.target.value)} />

              <div className="profile-actions">
                <button className="checkout-btn-secondary" onClick={onClose}>Cancel</button>
                <button className="checkout-btn-primary" onClick={handleSave}>Save</button>
                <button className="checkout-btn-secondary" onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
