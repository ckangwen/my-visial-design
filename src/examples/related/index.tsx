import React, { useCallback } from 'react';
import { Editor } from '@/core/editor/Editor';
import { Frame } from '@/core/render/Frame';
import { useNode } from '@/core/hooks/useNode';

import '@/index.css'
import { useCollector } from '../../core/hooks/useCollector';

function App() {
  return (
    <div id="app">
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
      <h2>Settings - { selected && selected.displayName }</h2>

      {selected && selected.setting && React.createElement(selected.setting)}
    </div>
  )
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

const DragItemSetting = () => {
  return (
    <p>Button Setting</p>
  )
}

(DragItem as any).craft = {
  related: {
    setting: DragItemSetting
  }
}

export default App;
