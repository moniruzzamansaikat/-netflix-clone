import React from 'react'
import './navbar.css'

export default function Navbar({ makeDark }) {
  const handleChange = (e) => {
    e.target.checked ? makeDark(false) : makeDark(true)
  }

  return (
    <nav>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <div className="switch">
        <input type="checkbox" name="toggle" onChange={handleChange} />
        <label htmlFor="toggle">
          <i className="bulb">
            <span className="bulb-center"></span>
          </i>
        </label>
      </div>
    </nav>
  )
}
