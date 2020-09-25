import React from 'react';
import { Editor } from './core/editor/Editor';
import { Frame } from './core/render/Frame';

function App() {
  return (
    <div className="App">
      <Editor>
        <Frame>
          <div>
            <h2>hello</h2>
            <p>world</p>
          </div>
        </Frame>
      </Editor>
    </div>
  );
}

const Demo: React.FC<any> = ({ chlidren }) => {
  return (
    <p>heeeello</p>
  )
}

export default App;
