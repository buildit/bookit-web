import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({ isLoggedIn, isUserAdmin, name, logoutRequest }) => (
  <nav>
    { isLoggedIn &&
      <div>
        Hello{ ' ' }<span>{ name }!</span>
      </div>
    }
    { isUserAdmin &&
      <div>
        <a href="#" onClock={(event) => {
          event.preventDefault()
        }}>Manage Users</a>
      </div>
    }
    <div>
      <a href="#" onClick={(event) => {
        event.preventDefault()
        logoutRequest()
      }}>Log out</a>
    </div>
  </nav>
)

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  isUserAdmin: PropTypes.bool,
  name: PropTypes.string,
  logoutRequest: PropTypes.func,
}

export default Navbar
