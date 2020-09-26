import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/core/store'

export const Editor: React.FC = ({ children, ...options }) => {
  return (
    <Provider store={store}>
      <div>
        { children }
      </div>
    </Provider>
  )
}
