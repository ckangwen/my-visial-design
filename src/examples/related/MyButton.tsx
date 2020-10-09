import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Select, Switch, InputNumber, Radio } from 'antd'
import { useNode } from '@/core/hooks/useNode';

import 'antd/dist/antd.min.css'

const { Option } = Select;

const MyButton: React.FC<any> = ({ type, text, loading, disabled }) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <Button type={type} ref={refFn} loading={loading} disabled={disabled}>
      { text }
    </Button>
  )
}


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const ButtonTypes = [
  'default',
  'primary',
  'ghost',
  'dashed',
  'link',
  'text',
]
const DragItemSetting = () => {
  const { props, nodeHelper } = useNode((node) => ({ props: node.data.props })) as any
  const [propsCopy, setPropsCopy] = useState(props)
  const onChange = useCallback((value, key) => {
    setPropsCopy({
      ...propsCopy,
      [key]: value
    })
    nodeHelper.setProp(key, value)
  }, [nodeHelper, propsCopy])

  const generateFormItem = (name: string, value: any) => {
    const type = typeof value
    let children = null
    if (type === 'string') {
      children=  <Input onChange={(e: any) => onChange(e.target.value, name)} />
    }
    if (type === 'boolean') {
      children =  <Switch checked={propsCopy.disabled} onChange={(value) => onChange(value, name)} />
    }
    if (type === 'number') {
      children = <InputNumber onChange={(value) => onChange(value, name)} />
    }
    if (Array.isArray(value)) {
      children = (
        <Radio.Group onChange={(value) => onChange(value, name)}>
          {
            value.map(val => (<Radio.Button value={val}>{val}</Radio.Button>))
          }
      </Radio.Group>
      )
    }

    return (
      <Form.Item key={name} label={name} name={name}>
        { children }
      </Form.Item>
    )
  }
  console.log(propsCopy);

  return (
    <Form
      {...layout}
      initialValues={propsCopy}
    >
      {
        Object.keys(propsCopy).map(key => (generateFormItem(key, propsCopy[key])))
      }
      {/* <Form.Item label="Text" name="text">
        <Input onChange={(e: any) => onChange(e.target.value, 'text')} />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select onChange={(value) => onChange(value, 'type')}>
          {
            ButtonTypes.map(type => (<Option key={type} value={type}>{type}</Option>))
          }
        </Select>
      </Form.Item>
      <Form.Item label="Loading" name="loading">
        <Switch checked={propsCopy.loading} onChange={(value) => onChange(value, 'loading')} />
      </Form.Item>
      <Form.Item label="Disabled" name="disabled">
        <Switch checked={propsCopy.disabled} onChange={(value) => onChange(value, 'disabled')} />
      </Form.Item> */}
    </Form>
  );
};

(MyButton as any).craft = {
  related: {
    setting: DragItemSetting
  }
}

export default MyButton