import { Modal, Form, Input } from "antd";
import { useImperativeHandle, useState } from "react";

import { BrandItem } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import { message } from "@/utils/antdGlobal";

const CreateArea = (props: IModalProp<BrandItem>) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>("create");
  const [form] = Form.useForm();
  // 暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });
  const open = (type: IAction, data?: BrandItem) => {
    setAction(type);
    setVisible(true);
    if (data) {
      form.setFieldsValue(data);
    }
  };
  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (valid) {
      // const params = form.getFieldsValue();
      if (action === "create") {
        // await api.createRole(params);
      } else {
        // await api.editRole(params);
      }
      message.success("操作成功");
      handleCancel();
      props.update();
    }
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title={action === "create" ? "新增" : "编辑"}
      width={600}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateArea;
