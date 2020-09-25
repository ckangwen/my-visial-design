import React from 'react'
import { Provider, useSelector } from 'react-redux';
import { store } from '@/core/store'

export const Editor: React.FC = ({ children, ...options }) => {
  // const context = useEditorStore(options)
  return (
    <Provider store={store}>
      <div>
        { children }
      </div>
    </Provider>
  )
}
