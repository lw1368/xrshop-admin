import { Button, Form, Input, Space, Table } from "antd";
import { useRef, useState } from "react";

import { ColumnsType } from "antd/es/table";

import { useForm } from "antd/es/form/Form";

import { IAction } from "@/types/modal";

import { BrandItem } from "@/types/api";
import { message, modal } from "@/utils/antdGlobal";

import CreateBrand from "./modal";

const BrandList = () => {
  const [form] = useForm();
  const brandRef = useRef<{
    open: (type: IAction, data?: BrandItem) => void;
  }>();
  const [ids, setIds] = useState<number[]>([]);
  // 创建
  const handleCreate = () => {
    brandRef.current?.open("create");
  };

  // 编辑
  const handleEdit = (record: BrandItem) => {
    brandRef.current?.open("edit", record);
  };

  // 删除
  const handleDel = (userId: number) => {
    modal.confirm({
      title: "删除确认",
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId]);
      },
    });
  };

  // 批量删除确认
  const handlePatchConfirm = () => {
    if (ids.length === 0) {
      message.error("请选择要删除的用户");
      return;
    }
    modal.confirm({
      title: "删除确认",
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(ids);
      },
    });
  };

  // 公共删除接口
  const handleUserDelSubmit = async (delIds: number[]) => {
    try {
      message.success("删除成功");
      setIds([]);
    } catch (error) {
      /* empty */
    }
  };
  const columns: ColumnsType<BrandItem> = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用户邮箱",
      dataIndex: "userEmail",
      key: "userEmail",
    },

    {
      title: "操作",
      key: "address",
      render(record: BrandItem) {
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
  const hasSelected = ids.length > 0;
  return (
    <div>
      <Form form={form} className="search-form" layout="inline">
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">搜索</Button>
            <Button type="default">重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">品牌列表</div>
          <div className="aciton">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
            <Button
              type="default"
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
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: ids,
            onChange: (selectedRowKeys: React.Key[]) => {
              setIds(selectedRowKeys as number[]);
            },
          }}
          columns={columns}
        />
      </div>
      <CreateBrand mRef={brandRef} update={() => {}} />
    </div>
  );
};

export default BrandList;
