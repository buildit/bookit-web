import React from 'react'
import { render } from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import configureStore from '../configureStore'

import Root from './Root'

const store = configureStore({})

const mount = (Component) => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.querySelector('#root')
  )
}

mount(Root)

if (module.hot) module.hot.accept('./Root', () => mount(Root))
