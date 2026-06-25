import React from 'react'
import { needsSize, getSizeLabel } from '../utils/productHelpers'

export default function ProductModal({
  selectedProduct,
  setSelectedProduct,
  selectedSize,
  setSelectedSize,
  handleAddToCart
}) {
  if (!selectedProduct) return null

  const productNeedsSize = needsSize(selectedProduct.category)

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn modal-close-corner" onClick={() => setSelectedProduct(null)} aria-label="Close Modal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-gallery">
          <img className="modal-img" src={selectedProduct.image} alt={selectedProduct.name} />
        </div>

        <div className="modal-details">
          <div>
            <span className="modal-category">{selectedProduct.category}</span>
            <h3 className="modal-title">{selectedProduct.name}</h3>
            <div className="product-rating" style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>
              <span>★</span>
              <span>{selectedProduct.rating}</span>
              <span className="rating-count">({selectedProduct.reviews} verified reviews)</span>
            </div>
          </div>

          <div className="product-price-row" style={{ fontSize: '1.2rem' }}>
            <span className="price-current" style={{ fontSize: '1.5rem' }}>${selectedProduct.price.toFixed(2)}</span>
            <span className="price-original" style={{ fontSize: '1.1rem' }}>${selectedProduct.originalPrice.toFixed(2)}</span>
            <span className="price-discount" style={{ fontSize: '1rem' }}>({selectedProduct.discount})</span>
          </div>

          <p className="modal-desc">
            {selectedProduct.description}
          </p>

          {/* Size Selector for clothing/shoes */}
          {productNeedsSize && (
            <div>
              <span className="size-selector-label">Select Size</span>
              <div className="size-grid">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {getSizeLabel(selectedProduct.category, size)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className="checkout-btn"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              const labelSize = productNeedsSize ? getSizeLabel(selectedProduct.category, selectedSize) : 'OS'
              handleAddToCart(selectedProduct, labelSize)
            }}
          >
            Add to Shopping Bag
          </button>
        </div>
      </div>
    </div>
  )
}
