import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Profile from './components/Profile'
import PromoWidget from './components/PromoWidget'
import ShowcasePanel from './components/ShowcasePanel'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import CheckoutModal from './components/CheckoutModal'
import OrderHistory from './components/OrderHistory'
import { catalogData } from './data/catalog'
import { getDefaultSize } from './utils/productHelpers'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [cart, setCart] = useState([])
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('clothes')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showDealsOnly, setShowDealsOnly] = useState(false)
  const [showClearanceOnly, setShowClearanceOnly] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [orders, setOrders] = useState([])

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Wrapped setter: whenever a product is opened in the modal, reset the
  // selected size to that product's correct default (avoids carrying over
  // a stale size, e.g. 'XL', from a previously viewed product).
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    if (product) {
      setSelectedSize(getDefaultSize(product.category))
    }
  }

  // Add to cart functionality. `size` is optional — if omitted, the correct
  // default for the product's category is used ('OS' for sizeless items
  // like bags/accessories, 'M' for clothes/shoes), so quick-adds from the
  // grid no longer mismatch the size used by the product modal.
  const handleAddToCart = (product, size) => {
    const resolvedSize = size || getDefaultSize(product.category)
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === resolvedSize)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === resolvedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, size: resolvedSize, quantity: 1 }]
    })
    setIsCartOpen(true)
    setSelectedProduct(null)
  }

  // Update item quantity in cart
  const handleUpdateQty = (itemId, size, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId && item.size === size) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  // Remove item from cart
  const handleRemoveItem = (itemId, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === itemId && item.size === size)))
  }

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Get active products to show
  const getProductsToShow = () => {
    const allProducts = Object.keys(catalogData).flatMap((key) => catalogData[key].products)
    let list = []

    if (showDealsOnly) {
      list = allProducts.filter((product) => product.isDeal)
    } else if (showClearanceOnly) {
      list = allProducts.filter((product) => product.isClearanceSale)
    } else if (showAllProducts) {
      list = allProducts
    } else {
      list = catalogData[selectedCategoryKey]?.products || []
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      return list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }
    return list
  }

  const panelTitle = showDealsOnly
    ? "Today's Deals"
    : showClearanceOnly
    ? 'Clearance'
    : showAllProducts
    ? 'All Featured Styles'
    : catalogData[selectedCategoryKey]?.title

  const productsToShow = getProductsToShow()

  // Opens the checkout details modal instead of completing the order
  // immediately. The actual order placement (and cart clearing) happens
  // in handlePlaceOrder once the customer submits their details.
  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const handlePlaceOrder = (customerDetails) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      cart,
      total: cartSubtotal,
      customerDetails
    }
    setOrders((prev) => [newOrder, ...prev])
    console.log('Order placed:', { customerDetails, cart, cartSubtotal })
    setCart([])
    setCurrentPage('orders')
  }

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        cartItemCount={cartItemCount}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategoryKey={selectedCategoryKey}
        showAllProducts={showAllProducts}
        setSelectedCategoryKey={setSelectedCategoryKey}
        setShowAllProducts={setShowAllProducts}
        setShowDealsOnly={setShowDealsOnly}
        setShowClearanceOnly={setShowClearanceOnly}
        openProfile={() => setIsProfileOpen(true)}
        openOrders={() => setCurrentPage('orders')}
      />

      {currentPage === 'orders' ? (
        <OrderHistory orders={orders} onGoHome={() => setCurrentPage('home')} />
      ) : (
        <main className="app-container">
        {/* Hero Section */}
        <section
          className="hero-section"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="hero-content">
            <span className="hero-subtitle">Summer Wardrobe Refresh</span>
            <h1 className="hero-title">Elevate Your Everyday Style</h1>
            <p className="hero-description">
              Discover clean silhouettes, premium fabrics, and essential streetwear styling. Get up to 55% off on selected essentials for a limited time.
            </p>
            <button
              className="cta-btn"
              onClick={() => {
                setShowClearanceOnly(true)
                setShowDealsOnly(false)
                setShowAllProducts(false)
                setSearchQuery('')
                window.scrollTo({ top: 400, behavior: 'smooth' })
              }}
            >
              Shop Clearance
            </button>
          </div>
          <div className="hero-decorations"></div>
        </section>

        {/* Trust strip — fills the gap below the hero with concrete reasons to buy */}
        <section className="trust-strip">
          <div className="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.873c0-.518-.42-.938-.938-.938H3.375A1.125 1.125 0 0 0 2.25 6.95v9.825c0 .621.504 1.125 1.125 1.125H4.5" />
            </svg>
            <div>
              <span className="trust-title">Free Shipping</span>
              <span className="trust-sub">On every order, no minimum</span>
            </div>
          </div>
          <div className="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <div>
              <span className="trust-title">Easy 30-Day Returns</span>
              <span className="trust-sub">Didn't love it? Send it back</span>
            </div>
          </div>
          <div className="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <div>
              <span className="trust-title">Secure Checkout</span>
              <span className="trust-sub">Your details, always protected</span>
            </div>
          </div>
          <div className="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313M21 14.25v2.25l-2.25 1.313M3 14.25v2.25l2.25 1.313" />
            </svg>
            <div>
              <span className="trust-title">Quality Guaranteed</span>
              <span className="trust-sub">Crafted from premium materials</span>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <PromoWidget
            catalogData={catalogData}
            setSelectedCategoryKey={setSelectedCategoryKey}
            setShowAllProducts={setShowAllProducts}
            setShowDealsOnly={setShowDealsOnly}
            setShowClearanceOnly={setShowClearanceOnly}
            setSearchQuery={setSearchQuery}
          />

          <ShowcasePanel
            productsToShow={productsToShow}
            panelTitle={panelTitle}
            selectedCategoryKey={selectedCategoryKey}
            catalogData={catalogData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedProduct={handleSelectProduct}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </main>
      )}
      {/* Footer */}
      <footer className="footer">
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <a href="#" className="footer-link">About AURA</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Press Releases</a>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <a href="#" className="footer-link">Your Orders</a>
            <a href="#" className="footer-link">Shipping Info</a>
            <a href="#" className="footer-link">Returns & Refunds</a>
          </div>
          <div className="footer-col">
            <h4>Policies</h4>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Simulated Checkout Info</a>
          </div>
        </div>
        <div className="footer-content">
          <p>© 2026 AURA Fashion Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        cartItemCount={cartItemCount}
        cartSubtotal={cartSubtotal}
        handleUpdateQty={handleUpdateQty}
        handleRemoveItem={handleRemoveItem}
        handleCheckout={handleCheckout}
      />

      {/* Product Detail Modal */}
      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        handleAddToCart={handleAddToCart}
      />

      {/* Checkout Details Modal */}
      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        cart={cart}
        cartSubtotal={cartSubtotal}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Profile Modal */}
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}

export default App