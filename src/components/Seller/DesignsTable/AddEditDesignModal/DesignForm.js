import React from 'react';
import { Form, Input } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  DESIGN_LABEL_VALUE_OPTIONS, DESIGN_VALUES,
} from 'components/contants';
import RadioSelect from 'components/Common/RadioSelect';

export default function DesignForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        type: DESIGN_VALUES._2D,
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Design name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter design name!',
          },
        ]}
      >
        <Input placeholder="Design name"  />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select type!',
          },
        ]}
      >
        <RadioSelect
          options={DESIGN_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <Form.Item
        label="Mockup"
        name="mock"
        valuePropName="fileList"
      >
        <UploadBox />
      </Form.Item>
      <Form.Item
        label="Design"
        name="design"
        valuePropName="fileList"
      >
        <UploadBox />
      </Form.Item>
    </Form>
  )
}