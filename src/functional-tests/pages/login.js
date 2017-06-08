import { Selector as selector } from 'testcafe'

export default class Page {
  constructor() {
    this.emailInput = selector('#email')
    this.passwordInput = selector('#password')
    this.submitButton = selector('button[type=submit]')
  }
}
