import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/core/store'
import { Events } from '../events/Events';

export const Editor: React.FC = ({ children, ...options }) => {
  return (
    <Provider store={store}>
      <Events>
        { children }
      </Events>
    </Provider>
  )
}
