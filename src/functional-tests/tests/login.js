import { ClientFunction, Role } from 'testcafe'

import DashboardPage from '../pages/dashboard'

const BOOKITURI = process.env.BOOKITURI || 'http://localhost:3001'
const BOOKITUSER = process.env.BOOKITUSER || 'z'
const BOOKITPASSWD = process.env.BOOKITPASSWD || 'z'

const regularAccUser = Role(`${BOOKITURI}/login`, async (t) => {
  await t
    .typeText('#cred_userid_inputtext', BOOKITUSER)
    .typeText('#cred_password_inputtext', BOOKITPASSWD)
    .click('#cred_sign_in_button')
})

const getLocation = ClientFunction(() => window.location)

fixture `Login Process`
  .page `${BOOKITURI}`

test('Logging in sends you to the dashboard', async (t) => {
  const dashboardPage = new DashboardPage()

  await t
    .useRole(regularAccUser)
    .navigateTo('/')

  const location = await getLocation()
  await t.expect(location.pathname).eql(dashboardPage.pathName)
})
