import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { isLoggedIn, getUserName, isUserAdmin } from '../selectors'
import { logoutRequest } from '../actionCreators'

import Navbar from '../components/Navbar'

const mapStateToProps = createPropsSelector({
  isLoggedIn: isLoggedIn,
  name: getUserName,
  isUserAdmin: isUserAdmin,
})

export default connect(mapStateToProps, { logoutRequest })(Navbar)
