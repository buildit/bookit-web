import { validate } from './validate'

describe('User form validator', () => {
  it('Should return the proper error if there is no email value', () => {
    expect(validate({ email: undefined })).toEqual({ email: 'Email is required' })
  })

  it('Should return the proper error if the email is not formed correctly', () => {
    expect(validate({ email: 'blurgy mcblurgface' })).toEqual({ email: 'Email is invalid' })
  })

  it('Return no errors if email is present and properly formed', () => {
    expect(validate({ email: 'blurgy@mcblurgface.com' })).toEqual({})
  })
})
