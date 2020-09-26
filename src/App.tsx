import React from 'react';
import { Editor } from './core/editor/Editor';
import { Frame } from './core/render/Frame';
import { useNode } from './core/hooks/useNode';
import './index.css'

function App() {
  return (
    <div className="App">
      <Editor>
        <Frame>
          <div>
            <Container2 />
            <Demo />
            <h2>hello</h2>
            <p>world</p>
            <Container />
          </div>
        </Frame>
      </Editor>
    </div>
  );
}

const Demo: React.FC<any> = ({ chlidren }) => {
  const {connect} = useNode()
  const refFn = function (el) {
    connect(el)
  }
  return (
    <p ref={refFn}>heeeello</p>
  )
}

const Container: React.FC<any> = ({ chlidren }) => {
  const {connect} = useNode()
  const refFn = function (el) {
    connect(el)
  }
  return (
    <div className="box" ref={refFn}>
      Box
    </div>
  )
}

const Container2: React.FC<any> = ({ chlidren }) => {
  const {connect} = useNode()
  const refFn = function (el) {
    connect(el)
  }
  return (
    <div className="box" ref={refFn}>
      Box2
    </div>
  )
}

export default App;
