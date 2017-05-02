var assert = require('assert');
describe('Login page', function() {
  browser.url('http://localhost:3001');

  it('should have a title', function () {
      var title = browser.getTitle();
      assert.equal(title, 'Bookit');
  });

  it('should have a login button', function () {
      var loginButton = browser.getText('button=Login');
      assert.equal(loginButton, 'LOGIN');
  });
});
