import { Selector } from 'testcafe';

export default class Page {
  constructor () {
    this.emailInput = Selector('#email');
    this.passwordInput = Selector('#password');
    this.submitButton = Selector('button[type=submit]');
  }
}
