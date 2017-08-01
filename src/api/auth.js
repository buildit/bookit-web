import agent from 'superagent'

import * as Azure from './azure'
import { apiBaseUrl } from './utils'

export const getOpenIdUrl = () => Azure.signinRequestUrl()

export const login = code => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ code })
  .then(response => response.body)
