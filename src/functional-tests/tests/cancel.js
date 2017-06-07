import LoginPage from '../pages/login';
import DashboardPage from '../pages/dashboard';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// eslint-disable-next-line no-unused-expressions
fixture `Cancelling a meeting`.page `http://localhost:3001`;

test
  // To prepare for the test, first log in and create a meeting
  .before(async t => {
    await t
    .typeText(loginPage.emailInput, 'bruce@myews.onmicrosoft.com')
    .typeText(loginPage.passwordInput, 'who da boss?')
    .click(loginPage.submitButton)
    .click(dashboardPage.timeline)
    .typeText(dashboardPage.meetingFormNameInput, 'Blurgtime')
    .click(dashboardPage.bookitButton);
  })('User can cancel a meeting', async t => {
    await t
      .setTestSpeed(0.3)
      .hover(DashboardPage.meetingByTitle('Blurgtime'))
      .click(dashboardPage.editButton)
      .click(dashboardPage.deleteButton)
      .expect(DashboardPage.meetingByTitle('Blurgtime').exists)
          .ok('The meeting we are cancelling still exists, before we have clicked the confirmation button.')
      .click(dashboardPage.deleteConfirmationButton)
      .expect(DashboardPage.meetingByTitle('Blurgtime').exists)
          .notOk('The meeting is no longer on the timeline.');

    await t.navigateTo('/dashboard')
      .expect(DashboardPage.meetingByTitle('Blurgtime').exists)
        .notOk('The meeting should have been removed from the Agenda.');
  });
