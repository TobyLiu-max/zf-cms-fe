import React from 'react';
import { Table, Button, Form, Row, Col, Input } from 'antd';
import data from './modal/list';

export default () => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: '姓名',
      dataIndex: 'guestName',
      key: 'guestName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'visitStatus',
      key: 'visitStatus',
    },
    {
      title: '访客电话',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: '来访人数',
      dataIndex: 'personNum',
      key: 'personNum',
    },
    {
      title: '来访时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
    },
    {
      title: '来访地点',
      dataIndex: 'visitSiteInfo',
      key: 'visitSiteInfo',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <>
          <Button style={{ marginRight: '10px' }}>修改</Button>
          <Button danger>删除</Button>
        </>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Row style={{ height: '50px' }}>
        <Col span={12} style={{ fontSize: '20px' }}>
          预约记录
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </Col>
      </Row>

      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="姓名" name="username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="来访地点" name="visitTime">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              清空
            </Button>
            <Button>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data.data.pageList} />
    </div>
  );
};
