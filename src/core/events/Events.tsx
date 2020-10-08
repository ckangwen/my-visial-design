import React from 'react'
import { useSelector } from 'react-redux'
import { EventState, Placement, NodeBoxInfo } from '@/types';
import { getDOMInfo } from '@/shared'

export const Events: React.FC = ({ children }) => {
  const { indicator } = useSelector<any>(state => state.events) as EventState
  // TODO 如果是原生元素，将会抛出异常
  return (
    <React.Fragment>
      {
        indicator && indicator.placement.parent.dom && React.createElement(RenderIndicator, {
          style: {
            ...movePlaceholder(
              indicator.placement,
              getDOMInfo(indicator.placement.parent.dom),
              indicator.placement.currentNode &&
                getDOMInfo(indicator.placement.currentNode.dom)
            ),
            backgroundColor: 'green',
            transition: '0.2s ease-in',
          },
        })
      }
      { children }
    </React.Fragment>
  )
}

export const RenderIndicator: React.FC<any> = ({ style }) => {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'block',
        opacity: 1,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'transparent',
        zIndex: 99999,
        ...style,
      }}
    ></div>
  );
};

function movePlaceholder(
  pos: Placement,
  canvasDOMInfo: NodeBoxInfo, // which canvas is cursor at
  bestTargetDomInfo: NodeBoxInfo | null // closest element in canvas (null if canvas is empty)
) {
  let t = 0,
    l = 0,
    w = 0,
    h = 0,
    where = pos.where;

  const elDim = bestTargetDomInfo;

  if (elDim) {
    // If it's not in flow (like 'float' element)
    if (!elDim.inFlow) {
      w = 2;
      h = elDim.outerHeight;
      t = elDim.top;
      l = where === 'before' ? elDim.left : elDim.left + elDim.outerWidth;
    } else {
      w = elDim.outerWidth;
      h = 2;
      t = where === 'before' ? elDim.top : elDim.bottom;
      l = elDim.left;
    }
  } else {
    if (canvasDOMInfo) {
      t = canvasDOMInfo.top + canvasDOMInfo.padding.top;
      l = canvasDOMInfo.left;
      w = canvasDOMInfo.outerWidth;
      h = 2;
    }
  }
  return {
    top: `${t}px`,
    left: `${l}px`,
    width: `${w}px`,
    height: `${h}px`,
  };
}
