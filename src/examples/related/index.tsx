import React, { useCallback } from 'react';
import { Editor } from '@/core/editor/Editor';
import { Frame } from '@/core/render/Frame';
import { useCollector } from '../../core/hooks/useCollector';
import { useNode } from '@/core/hooks/useNode';
import MyButton from './MyButton'
import '@/index.css'

function App() {
  return (
    <div id="app">
        <Editor>
          <Frame>
            <Container3>
              <Container2 />
              <Container2 />
              <Container>
                <MyButton text="Antd Button" type="primary" loading={false} disabled={false} />
              </Container>
            </Container3>
          </Frame>
          <div className="sidebar">
            <div className="panel">
              <div className="panel-body">
                <SettingsPanel />
              </div>
            </div>
          </div>
        </Editor>
    </div>
  );
}

const SettingsPanel = () => {
  const { selected } = useCollector(state => {
    const selectedId = state.events.selected
    let selected;

    if (selectedId) {
      selected = {
        id: selectedId,
        name: state.nodes.nodes[selectedId].data.name,
        displayName: state.nodes.nodes[selectedId].data.displayName,
        setting:
        state.nodes.nodes[selectedId].related &&
        state.nodes.nodes[selectedId].related.setting,
      };
    }

    return {
      selected: selected || {},
    };
  })

  return (
    <div>
      {
        selected && selected.displayName && (<h2>Settings -{selected.displayName}</h2>)
      }
      {selected && selected.setting && React.createElement(selected.setting)}
    </div>
  )
}

const Container: React.FC<any> = ({ children }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <div className="box" ref={refFn}>
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
