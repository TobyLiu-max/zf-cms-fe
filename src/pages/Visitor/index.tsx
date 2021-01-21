import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Input } from 'antd';
import moment from 'moment';
import { fetchVisitorList } from '../../services/visitor';

export default () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'guestName',
    },
    {
      title: '访客电话',
      dataIndex: 'mobileNumber',
    },
    {
      title: '来访人数',
      dataIndex: 'personNum',
    },
    {
      title: '来访时间',
      dataIndex: 'visitTime',
      render: (value: number) => moment(value).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '来访地点',
      dataIndex: 'siteName',
    },
    {
      title: '操作',
      render: () => (
        <>
          <Button style={{ marginRight: '10px' }}>修改</Button>
          <Button danger>删除</Button>
        </>
      ),
    },
  ];

  const visitorList = async () => {
    const data = await fetchVisitorList();
    setData(data.data);
  };

  useEffect(() => {
    visitorList();
  }, []);

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
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
  );
};
