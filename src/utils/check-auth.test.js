import * as auth from './check-auth'

const user = { email: 'tester@test.com', token: '1a2b3c4d5e', isAdmin: false }
const admin = { email: 'bruce@builditcontoso.onmicrosoft.com', token: 'a1b2c3d4e5', isAdmin: true }
const notAUser = { email: null, token: null }

const dispatch = jest.fn()

beforeEach(() => {
  localStorage.removeItem('user')
  dispatch.mockClear()
})

describe('auth.isAuthorizedUser', () => {
  it('forbids with no logged in user', () => {
    expect(auth.isAuthorizedUser(notAUser, dispatch)).toBeFalsy()
    expect(dispatch.mock.calls.length).toBe(0)
  })

  it('returns true when DANGEROUSLY rehydrating stored user when state is empty', () => {
    localStorage.setItem('user', JSON.stringify(user))

    expect(auth.isAuthorizedUser(notAUser, dispatch)).toBeTruthy()
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('returns true when DANGEROUSLY allowing full user from state', () => {
    expect(auth.isAuthorizedUser(user, dispatch)).toBeTruthy()
    expect(dispatch.mock.calls.length).toBe(0)
  })
})

describe('auth.isAuthorizedAdmin', () => {
  it('forbids with no logged in user', () => {
    expect(auth.isAuthorizedAdmin(notAUser, dispatch)).toBeFalsy()
    expect(dispatch.mock.calls.length).toBe(0)
  })

  it('forbids non-admin users', () => {
    expect(auth.isAuthorizedAdmin(user, dispatch)).toBeFalsy()
  })

  it('forbids non-admin users rehydrated from storage', () => {
    localStorage.setItem('user', JSON.stringify(user))

    expect(auth.isAuthorizedAdmin(notAUser, dispatch)).toBeFalsy()
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('returns true when DANGEROUSLY rehydrating stored admin user when state is empty', () => {
    localStorage.setItem('user', JSON.stringify(admin))

    expect(auth.isAuthorizedAdmin(notAUser, dispatch)).toBeTruthy()
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('returns true when DANGEROUSLY allowing full admin user from state', () => {
    expect(auth.isAuthorizedAdmin(admin, dispatch)).toBeTruthy()
    expect(dispatch.mock.calls.length).toBe(0)
  })
})
