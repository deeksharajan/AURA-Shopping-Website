import React from 'react'

export default function ShowcasePanel({
  productsToShow,
  panelTitle,
  selectedCategoryKey,
  catalogData,
  searchQuery,
  setSearchQuery,
  setSelectedProduct,
  handleAddToCart
}) {
  return (
    <section id="products-section" className="showcase-panel">
      <div className="panel-header">
        <div className="panel-title-area">
          <h2 className="panel-title">{panelTitle}</h2>

          <span className="panel-subtitle">
            {productsToShow.length} results{' '}
            {searchQuery && `for "${searchQuery}"`}
          </span>
        </div>
      </div>

      {productsToShow.length > 0 ? (
        <div className="products-grid">
          {productsToShow.map((product) => (
            <div key={product.id} className="product-card">
{product.isDeal && (
                    <span className="badge-sale">
                      Deal
                    </span>
                  )}
                  {product.isClearanceSale && (
                    <span className="badge-sale" style={{ backgroundColor: 'var(--accent-secondary)' }}>
                      Clearance
                </span>
              )}

              <div
                className="product-img-wrapper"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  className="product-card-img"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-info">
                <span
                  className="product-name"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </span>

                <div className="product-rating">
                  <span className="star-row">
                    ★★★★☆
                  </span>

                  <span className="rating-count">
                    {product.reviews}
                  </span>
                </div>

                <div className="product-price-row">
                  <span className="price-current">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="price-original">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>

                <span className="price-discount-line">
                  {product.discount} off
                </span>

                <span className="delivery-line">
                  FREE delivery · Get it by tomorrow
                </span>

                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="empty-cart"
          style={{ minHeight: '300px' }}
        >
          <p>
            No products match your current search queries.
          </p>

          <button
            className="add-cart-btn"
            style={{
              width: 'auto',
              padding: '0.6rem 1.5rem',
              marginTop: '1rem'
            }}
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  )
}