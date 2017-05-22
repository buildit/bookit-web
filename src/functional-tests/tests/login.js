import LoginPage from '../pages/login';
import DashboardPage from '../pages/dashboard';

// eslint-disable-next-line no-unused-expressions
fixture `Login Process`.page `http://localhost:3001`;

test('Logging in sends you to the dashboard', async t => {
  // Starting on the homepage sends you to the login page initially.
  const initialLocation = await t.eval(() => window.location);
  await t.expect(initialLocation.pathname).eql('/login');

  const loginPage = new LoginPage();
  await t
    .typeText(loginPage.emailInput, 'romans@myews.onmicrosoft.com')
    .typeText(loginPage.passwordInput, 'enterprise: engage')
    .click(loginPage.submitButton);

  // Once we've logged in, we should land on the dashboard.
  const dashboardPage = new DashboardPage();
  const afterLoginLocation = await t.eval(() => window.location);
  await t.expect(afterLoginLocation.pathname).eql(dashboardPage.pathName);

  // Once logged in, the homepage sends you to the dashboard, as well.
  await t.navigateTo('/');
  const finalLocation = await t.eval(() => window.location);
  await t.expect(finalLocation.pathname).eql(dashboardPage.pathName);
});
