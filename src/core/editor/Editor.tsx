import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/core/store'
import { Events } from '../events/Events'
import { ROOT_ELEMENT_ID } from '@/shared'

export const Editor: React.FC = ({ children, ...options }) => {
  return (
    <Provider store={store}>
      <div id={ROOT_ELEMENT_ID}>
        <Events>
          { children }
        </Events>
      </div>
    </Provider>
  )
}
