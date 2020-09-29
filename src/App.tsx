import React, { useCallback } from 'react';
import { Editor } from './core/editor/Editor';
import { Frame } from './core/render/Frame';
import { useNode } from './core/hooks/useNode';
import './index.css'

function App() {
  return (
    <div className="App">
      <Editor>
        <Frame>
          <Container3>
            <Container2 />
            <Container2 />
            <Container>
              <DragItem />
            </Container>
          </Container3>
        </Frame>
      </Editor>
    </div>
  );
}

const DragItem: React.FC<any> = ({ children }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <div className="drag-item" ref={refFn}>C</div>
  )
}

const Container: React.FC<any> = ({ children }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <div className="box" ref={refFn}>
      Box
      { children }
    </div>
  )
}

const Container2: React.FC<any> = ({ children }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <div className="box" ref={refFn}>
      Box2
    </div>
  )
}
const Container3: React.FC<any> = ({ children }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <div className="box2" ref={refFn}>
      { children }
    </div>
  )
}

export default App;
