Unit Testing Guidelines
=======================

Preamble
--------

We use `jest` and `enzyme` as our test-runner and assertion library
respectively.

For mocking, we use the `mock` functionality built into Jest.

Module Structure and Naming
---------------------------

Unit test modules should live side-by-side with the module they are
testing, and must be named in the form of `Module.test.js` - where
`Module` is the name of the source module. For example:
```
MyFancyComponent.js -> MyFancyComponent.test.js
```

The same rule applies to `index.js` modules.

Basic Testing Strategy
----------------------

When testing components, at the very least there should be a single
test that asserts the component renders on its own. For example:
```
import React from 'react'
import { shallow } from 'enzyme'

describe('<MyFancyComponent />', () => {
  const props = {
    something: true,
    requiredHotdog: 'lemons',
  }

  it('renders', () => {
    const wrapper = shallow(<MyFancyComponent {...props} />)
    expect(wrapper).toBeTruthy()
  })
})
```

Even though the above test appears to have very little value, simply
asserting that the component is truthy often adds a high percentage of
code coverage off the bat and often ends up making it clear the
remaining lines of code that require testing.

In addition to (often) providing high coverage value, the test also
ensures that all required properties of a component are passed in
and then subsequent modifications to the source will require ensuring
the base `renders` test continues to pass.

Globals
-------

Jest is set to use browser mode which behind the scenes automagically
configures a JSDOM instance along with _most_ browser globals that you
can reference without having to import them into your code.

One exception is `localStorage`, which we have manually added as a
global in `__mocks__/storageMock.js`

For reference, here's the entire implementation of the mock:
```
const storageMock = () => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
};

const localStorageMock = (() => storageMock())();

global.localStorage = localStorageMock;

Object.defineProperty(
  window,
  'localStorage',
  { value: localStorageMock, configurable: true, enumerable: true, writable: true }
);
```

The above code is a little cryptic, but the gist is that we define
a very simple class that holds state essentially identically to how
localStorage actually works.

Note that we have _not_ mocked `sessionStorage`, but to do so would
simply be a case of defining an instance of `storageMock` assigned to
a const `sessionStorage`, apply that const to `global` and then
copying the `Object.defineProperty` call, replacing the words `local`
with `session`.

Before/After Fixtures
---------------------

Anything that you mock with `jest.fn()` can be reset between each test
case, although this is _not_ strictly necessary if you have a single
test case, or you want to record all calls and arguments to a mock.

```
...
const dispatch = jest.fn()

beforeEach(() => {
  localStorage.removeItem('user')
  dispatch.mockClear()
})

describe('auth.isAuthorizedUser', () => { ...
```

In other testing framework worlds, setup and teardown functions have
to be placed within the scope of the current suite or test, but for
Jest, you simply add calls to `before[Each|All]` and `after[Each|All]`
outside the scope of all suites and tests. The most logical place to
add such calls would be at the beginning of the test module, so it's
clear that the tests involve some kind of setup and teardown.

The global mock for `localStorage` is not a "true" mock, in that to
reset it you must manually remove any items previously added to it or
simply call the `localStorage.clear()` method.
