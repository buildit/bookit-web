import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'

import UserForm from '../../components/02-molecules/UserForm'

import { userInviteStart } from '../../actions/index'

const UserFormContainer = reduxForm({
  form: 'user-form',
})(UserForm)

const getSubmittableUser = (form) => {
  if (!form) return { values: {} }
  if (!form['user-form']) return { values: {} }
  if (!form['user-form'].values) return { values: {} }
  return form['user-form'].values
}

const mapStateToProps = state => ({
  user: getSubmittableUser(state.form),
  isInvitingUser: state.app.isInvitingUser,
})

const mapDispatchToProps = dispatch => ({
  // handleCancel: () => dispatch() cancel user invite
  handleSubmit: user => dispatch(userInviteStart(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer)
