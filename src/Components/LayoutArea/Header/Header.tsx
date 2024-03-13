import { NavLink } from 'react-router-dom'
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu'
import './Header.css'

function Header(): JSX.Element {
  return (
    <div className="Header">
      <h1>Coupons system</h1>
          <NavLink to="/home">🏠</NavLink>
      <AuthMenu />
    </div>
  )
}

export default Header
