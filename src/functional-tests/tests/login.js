import { ClientFunction, Role } from 'testcafe'

import DashboardPage from '../pages/dashboard'

const BOOKITURI = process.env.BOOKITURI || 'http://localhost:3001'
const BOOKITUSER = process.env.BOOKITUSER || 'z'
const BOOKITPASSWD = process.env.BOOKITPASSWD || 'z'

const regularAccUser = Role(`${BOOKITURI}/login`, async (t) => {
  await t
    .typeText('#cred-userid-inputtext', BOOKITUSER)
    .typeText('#cred-password-inputtext', BOOKITPASSWD)
    .click('#submit-button')
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
