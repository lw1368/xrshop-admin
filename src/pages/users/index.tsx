import { Button, Form, Input, Select, Space, Spin, Table } from "antd";

import { useLocation, useParams, useRoutes } from "react-router-dom";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

import { useAntdTable } from "ahooks";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { useEffect, useRef, useState } from "react";

import { User, UserSearchParams, ResultData } from "@/types/api";
import { formatDate } from "@/utils";
import { message, modal } from "@/utils/antdGlobal";
import { IAction } from "@/types/modal";

import { DELETE_USER } from "@/graphql/users";

import CreateUser from "./createuser";
import { useUsers } from "./user";

const UserList: React.FC = () => {
  const [form] = Form.useForm();
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 1,
  });
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void;
  }>();

  const [del] = useMutation(DELETE_USER);

  console.log(form.getFieldsValue());
  const { loading, data, refetch, page } = useUsers(form.getFieldsValue(), {
    current: tableParams.current,
    pageSize: tableParams.pageSize,
  });

  const [userIds, setUserIds] = useState<string[]>([]);

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open("create");
  };

  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open("edit", record);
  };
  // 批量删除确认
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error("请选择要删除的用户");
      return;
    }
    modal.confirm({
      title: "删除确认",
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds);
      },
    });
  };

  // 删除用户
  const handleDel = (id: string) => {
    modal.confirm({
      title: "删除确认",
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([id]);
      },
    });
  };

  // 公共删除用户接口
  const handleUserDelSubmit = async (ids: string[]) => {
    try {
      await del({
        variables: { ids: JSON.stringify(ids) },
      });
      message.success("删除成功");
      setUserIds([]);
      refetch();
    } catch (errors) {
      /* empty */
    }
  };
  const columns: ColumnsType<User.UserItem> = [
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
      width: "300px",
    },
    {
      title: "用户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "用户角色",
      dataIndex: "role",
      key: "role",
      render(role: number) {
        return {
          0: "超级管理员",
          1: "管理员",
          2: "体验管理员",
          3: "普通用户",
        }[role];
      },
    },
    // {
    //   title: "用户状态",
    //   dataIndex: "state",
    //   key: "state",
    //   render(state: number) {
    //     return {
    //       1: "在职",
    //       2: "离职",
    //       3: "试用期",
    //     }[state];
    //   },
    // },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime: string) {
        return formatDate(createTime);
      },
    },
    {
      title: "操作",
      key: "address",
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDel(record.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    setTableParams(pagination);
    refetch();
  };

  const handleSearchChange = () => {
    refetch();
  };

  const hasSelected = userIds.length > 0;

  return (
    <div className="user-list">
      <Form
        className="search-form"
        form={form}
        layout="inline"
        initialValues={{ state: 1 }}
      >
        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入用户ID" />
        </Form.Item>
        <Form.Item name="name" label="用户名称">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name="state" label="状态">
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearchChange}>
              搜索
            </Button>
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                refetch();
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">用户列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={handlePatchConfirm}
            >
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey="id"
          loading={loading}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as string[]);
            },
          }}
          columns={columns}
          dataSource={data}
          pagination={page}
          onChange={handleTableChange}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default UserList;
