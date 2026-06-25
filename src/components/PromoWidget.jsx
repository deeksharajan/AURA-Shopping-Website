import React from 'react'

export default function PromoWidget({
  catalogData,
  setSelectedCategoryKey,
  setShowAllProducts,
  setShowDealsOnly,
  setShowClearanceOnly,
  setSearchQuery
}) {
  return (
    <section className="promo-widget">
      <h2 className="promo-title">Shop by Category</h2>
      <ul className="category-sidebar-list">
        {Object.keys(catalogData).map((key) => {
          const category = catalogData[key]
          return (
            <li
              key={key}
              className="category-sidebar-item"
              onClick={() => {
                setSelectedCategoryKey(key)
                setShowAllProducts(false)
                setShowDealsOnly(false)
                setShowClearanceOnly(false)
                setSearchQuery('')
              }}
            >
              <img className="category-sidebar-thumb" src={category.promoImage} alt={category.title} />
              <span className="category-sidebar-label">{category.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14" className="category-sidebar-chevron">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
          )
        })}
      </ul>
      <div className="promo-banner">
        <span className="promo-banner-eyebrow">Limited Time</span>
        <span className="promo-banner-title">Up to 55% off apparel</span>
        <div className="promo-banner-actions">
          <button
            className="see-more-link"
            onClick={() => {
              setShowDealsOnly(true)
              setShowAllProducts(false)
              setShowClearanceOnly(false)
              setSearchQuery('')
            }}
          >
            Today&apos;s Deals →
          </button>
          <button
            className="see-more-link"
            onClick={() => {
              setShowClearanceOnly(true)
              setShowAllProducts(false)
              setShowDealsOnly(false)
              setSearchQuery('')
            }}
          >
            Shop Clearance →
          </button>
        </div>
      </div>
    </section>
  )
}