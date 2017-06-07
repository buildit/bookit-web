// export function checkAdminAuthorization({ dispatch, getState }) {
//   return (nextState, replace, next) => {
//     if (checkAuthorization(dispatch)) {
//       const user = getState().user
//       if (user.id === 1) {
//         return next()
//       }
//     }
//     replace('forbidden')
//     return next()
//   }
// }

import * as auth from './check-auth'

describe('admin auth', () => {
  const dispatch = jest.fn()

  it('forbids with no logged in user', () => {
    const getState = () => ({ user: undefined })
    const replace = jest.fn()
    const next = jest.fn()

    const authReturn = auth.checkAdminAuthorization({ dispatch, getState })
    authReturn(undefined, replace, next)

    expect(replace.mock.calls.length).toBe(1)
    expect(replace.mock.calls[0][0]).toBe('forbidden')
  })

  it('returns properly for authorized users', () => {
    global.localStorage.setItem('user', JSON.stringify('any arbitrary value'))
    const getState = () => ({ user: { id: 1 } })
    const replace = jest.fn()
    const next = jest.fn()

    const authReturn = auth.checkAdminAuthorization({ dispatch, getState })
    authReturn(undefined, replace, next)

    global.localStorage.removeItem('user')
    expect(replace.mock.calls.length).toBe(0)
  })

  it('forbids an unauthorized user', () => {
    global.localStorage.setItem('user', JSON.stringify('any arbitrary value'))
    const getState = () => ({ user: { id: 2 } })
    const replace = jest.fn()
    const next = jest.fn()

    const authReturn = auth.checkAdminAuthorization({ dispatch, getState })
    authReturn(undefined, replace, next)

    global.localStorage.removeItem('user')

    expect(replace.mock.calls.length).toBe(1)
    expect(replace.mock.calls[0][0]).toBe('forbidden')
  })
})
