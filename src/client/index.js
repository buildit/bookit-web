import React from 'react'
import { render } from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import configureStore from '../configureStore'

import Root from '../containers/Root'

const store = configureStore()

const mount = (Component) => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  )
}

mount(Root)

if (module.hot) module.hot.accept('../containers/Root', () => mount(Root))
