import React, { useState, useCallback } from 'react'
import { Form, Input, Switch, InputNumber, Radio } from 'antd'
import { useNode } from '@/core/hooks/useNode';
import { useCollector } from '../../../core/hooks/useCollector';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const ComponentSetting = () => {
  const { props, nodeHelper } = useNode((node) => ({ props: node.data.props })) as any
  const [propsCopy, setPropsCopy] = useState(props)
  const onChange = useCallback((value, key) => {
    setPropsCopy({
      ...propsCopy,
      [key]: value
    })
    nodeHelper.setProp(key, value)
  }, [nodeHelper, propsCopy])
  console.log(propsCopy);


  const generateFormItem = (name: string, value: any) => {
    const type = typeof value
    let children = null
    if (type === 'string') {
      children=  <Input value={value} onChange={(e: any) => onChange(e.target.value, name)} />
    } else if (type === 'boolean') {
      children =  <Switch checked={propsCopy[name]} onChange={(value) => onChange(value, name)} />
    } else if (type === 'number') {
      children = <InputNumber value={value} onChange={(value) => onChange(value, name)} />
    } else if (Array.isArray(value)) {
      children = (
        <Radio.Group value={value} onChange={(value) => onChange(value, name)}>
          {
            value.map(val => (<Radio.Button value={val}>{val}</Radio.Button>))
          }
      </Radio.Group>
      )
    } else {
      // TODO 其他的情况
      return null
    }

    return (
      <Form.Item key={name} label={name}>
        { children }
      </Form.Item>
    )
  }

  return (
    <Form
    {...layout}
      initialValues={propsCopy}
    >
      {
        Object.keys(propsCopy).map(key => (generateFormItem(key, propsCopy[key])))
      }
    </Form>
  );
}

export const SettingsPanel = () => {
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
    <div style={{ marginTop: 20 }}>
      {
        selected && selected.displayName && (<h2>Settings -{selected.displayName}</h2>)
      }
      {selected && selected.setting && React.createElement(selected.setting)}
    </div>
  )
}