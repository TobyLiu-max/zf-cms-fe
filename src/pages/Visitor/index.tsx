import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Input, message, Modal } from 'antd';
import moment from 'moment';
import { fetchVisitorList, deleteVisitor, createVisitor } from '../../services/visitor';

export default () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addVisitor = () => {
    setIsModalVisible(true);
  };

  const visitorList = async (params?: any) => {
    const data = await fetchVisitorList('http://localhost:3000/visitor', params);
    setData(data.data);
  };

  const handleOk = async () => {
    try {
      const data = await form.validateFields();
      const res = await createVisitor('http://localhost:3000/visitor', data);
      if (res.code === 200) {
        setIsModalVisible(false);
        visitorList();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    const data = await deleteVisitor(`http://localhost:3000/visitor/${id}`);
    if (data.code === 200) {
      visitorList();
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
  };

  const handleSearch = () => {
    visitorList(searchForm.getFieldsValue());
  };

  useEffect(() => {
    visitorList();
  }, []);

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
      render: (row: any) => (
        <>
          <Button style={{ marginRight: '10px' }}>修改</Button>
          <Button danger onClick={() => handleDelete(row._id)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row style={{ height: '50px' }}>
        <Col span={12} style={{ fontSize: '20px' }}>
          预约记录
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={addVisitor}>
            新增
          </Button>
        </Col>
      </Row>

      <Form form={searchForm} name="advanced_search" className="ant-advanced-search-form">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="姓名" name="guestName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="来访地点" name="siteName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                searchForm.resetFields();
              }}
            >
              清空
            </Button>
            <Button onClick={handleSearch}>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Modal title="新建预约" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name="basic" labelCol={{ span: 4 }}>
          <Form.Item
            label="姓名"
            name="guestName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="访客电话"
            name="mobileNumber"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="来访人数"
            name="personNum"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="来访时间"
            name="visitTime"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="来访地点"
            name="siteName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
