import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const getLinkClass = ({ isActive }) =>
  isActive ? 'nav-link is-active' : 'nav-link'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="brand" onClick={() => navigate('/')}>
          <p className="brand-title">Eli-маркет</p>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={getLinkClass} end>
            Товары
          </NavLink>
          <NavLink to="/cart" className={getLinkClass}>
            Корзина
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </NavLink>
          {isAuthenticated ? (
            <button type="button" className="link-button" onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <NavLink to="/login" className={getLinkClass}>
              Войти
            </NavLink>
          )}
        </nav>
        <div className="user-pill">
          <span className="user-name">
            {isAuthenticated ? user.username : 'Неизвестный'}
          </span>
        </div>
      </div>
    </header>
  )
}

