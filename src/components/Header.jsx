import React from 'react'

export default function Header({
  theme,
  toggleTheme,
  cartItemCount,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  selectedCategoryKey,
  showAllProducts,
  showDealsOnly,
  showClearanceOnly,
  setSelectedCategoryKey,
  setShowAllProducts,
  setShowDealsOnly,
  setShowClearanceOnly,
  openProfile,
  openOrders
}) {
  const scrollToProducts = () => {
  const section = document.getElementById('products-section')

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const handleCategoryClick = (category) => {
  setShowDealsOnly(false)
  setShowClearanceOnly(false)
  setShowAllProducts(false)
  setSelectedCategoryKey(category)
  setSearchQuery('')

  setTimeout(() => {
    scrollToProducts()
  }, 100)
}

  return (
    <div className="header-stack">
      <header className="header">
        <div
          className="logo-container"
          onClick={() => {
            setShowAllProducts(true)
            setShowDealsOnly(false)
            setShowClearanceOnly(false)
            setSelectedCategoryKey('clothes')
            setSearchQuery('')
          }}
        >
          <span>AURA</span>
          <span className="logo-dot"></span>
        </div>

        <div className="header-actions">
          {/* Search */}
          <div className="search-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Theme Toggle */}
          <button
            className="action-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21M9.75 12h4.5M9.75 12a2.25 2.25 0 0 1 2.25-2.25m0 0a2.25 2.25 0 0 1 2.25 2.25m-2.25-2.25V5.25m0 13.5v-2.25M4.909 19.091l1.591-1.591M17.5 6.5l1.591-1.591M3 12h2.25m13.5 0H21M4.909 4.909l1.591 1.591m11.002 11.002 1.591 1.591M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
                />
              </svg>
            )}
          </button>

          {/* Account */}
          <button
            className="action-btn account-btn"
            aria-label="Account"
            onClick={() => openProfile && openProfile()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {/* Orders */}
          <button
            className="action-btn account-btn"
            aria-label="Orders"
            onClick={() => openOrders && openOrders()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>

          {/* Cart */}
          <button
            className="action-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            {cartItemCount > 0 && (
              <span className="cart-badge">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <nav className="category-subnav">
  <ul className="nav-links">
    <li>
      <a
        href="#"
        className={`nav-link ${showAllProducts ? 'active-nav' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          setShowAllProducts(true)
          setShowDealsOnly(false)
          setShowClearanceOnly(false)
          setSelectedCategoryKey('clothes')
          setSearchQuery('')

          setTimeout(() => {
            scrollToProducts()
          }, 100)
        }}
      >
        All Styles
      </a>
    </li>

    <li>
      <a
        href="#"
        className={`nav-link ${
          selectedCategoryKey === 'clothes' ? 'active-nav' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleCategoryClick('clothes')
        }}
      >
        Clothes
      </a>
    </li>

    <li>
      <a
        href="#"
        className={`nav-link ${
          selectedCategoryKey === 'shoes' ? 'active-nav' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleCategoryClick('shoes')
        }}
      >
        Shoes
      </a>
    </li>

    <li>
      <a
        href="#"
        className={`nav-link ${
          selectedCategoryKey === 'bags' ? 'active-nav' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleCategoryClick('bags')
        }}
      >
        Bags
      </a>
    </li>

    <li>
      <a
        href="#"
        className={`nav-link ${
          selectedCategoryKey === 'accessories' ? 'active-nav' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleCategoryClick('accessories')
        }}
      >
        Accessories
      </a>
    </li>

    <li>
      <a
        href="#"
        className={
          `nav-link deals-link ${showDealsOnly ? 'active-nav' : ''}`
        }
        onClick={(e) => {
          e.preventDefault()
          setShowDealsOnly(true)
          setShowClearanceOnly(false)
          setShowAllProducts(false)
          setSearchQuery('')

          setTimeout(() => {
            scrollToProducts()
          }, 100)
        }}
      >
        Today's Deals
      </a>
    </li>

    <li>
      <a
        href="#"
        className={
          `nav-link clearance-link ${showClearanceOnly ? 'active-nav' : ''}`
        }
        onClick={(e) => {
          e.preventDefault()
          setShowClearanceOnly(true)
          setShowDealsOnly(false)
          setShowAllProducts(false)
          setSearchQuery('')

          setTimeout(() => {
            scrollToProducts()
          }, 100)
        }}
      >
        Shop Clearance
      </a>
    </li>
  </ul>
</nav>
    </div>
  )
}