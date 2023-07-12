import { Form, Input, Modal, Select, TreeSelect, Upload } from "antd";

import { useEffect, useImperativeHandle, useState } from "react";

import { useMutation } from "@apollo/client";

import { IAction, IModalProp } from "@/types/modal";
import { Role, User } from "@/types/api";
import { message } from "@/utils/antdGlobal";
import { CREATE_USER, UPDATE_USER } from "@/graphql/users";

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>("create");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [create] = useMutation(CREATE_USER);
  const [updateUserInfo] = useMutation(UPDATE_USER);
  const [userId, setUserId] = useState("");

  //   useEffect(()=>{
  //     getRoleList()
  //   },[])

  // 暴露子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  // 调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type);
    setVisible(true);
    if (type === "edit" && data) {
      form.setFieldsValue(data);
      setUserId(data.id);
    }
  };

  const handleSubmit = async () => {
    const valid = await form.validateFields();
    console.log(form.getFieldValue);
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
      };
      setConfirmLoading(true);
      if (action === "create") {
        await create({
          variables: { params },
        });
        message.success("创建成功");
      } else {
        await updateUserInfo({
          variables: { id: userId, params },
        });
        message.success("修改成功");
      }
      setConfirmLoading(false);

      props.update();

      setTimeout(() => {
        handleCancel();
      }, 500);
    }
  };

  const handleCancel = () => {
    setVisible(false);

    form.resetFields();
  };

  return (
    <Modal
      title={action === "create" ? "创建用户" : "编辑用户"}
      okText="确定"
      cancelText="取消"
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <div style={{ width: "80%", paddingTop: "20px" }}>
        <Form form={form} labelCol={{ span: 4 }}>
          {/* <Form.Item name="id" hidden>
            <Input />
          </Form.Item> */}
          <Form.Item
            label="用户名称"
            name="name"
            rules={[
              { required: true, message: "请输入用户名称" },
              { min: 5, max: 12, message: "用户名称最小5个字符，最大12个字符" },
            ]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item
            label="用户邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入用户邮箱" },
              { type: "email", message: "请输入正确的邮箱" },
            ]}
          >
            <Input placeholder="请输入用户邮箱" disabled={action === "edit"} />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { len: 11, message: "请输入11位手机号" },
              { pattern: /1[1-9]\d{9}/, message: "请输入1开头的11位手机号" },
            ]}
          >
            <Input type="number" placeholder="请输入手机号" />
          </Form.Item>

          {/* <Form.Item label="状态" name="state">
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item> */}
          {/* <Form.Item label="系统角色" name="roleList">
            <Select placeholder="请选择角色">
              <Select.Option value={1}>超级管理员</Select.Option>
              <Select.Option value={2}>管理员</Select.Option>
              <Select.Option value={3}>普通用户</Select.Option>
              {roleList.map((item) => {
                return (
                  <Select.Option value={item._id} key={item._id}>
                    {item.roleName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item> */}
          {/* <Form.Item label="用户头像">
          <Upload
            listType="picture-circle"
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${storage.get("token")}`,
            }}
            action="/api/users/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} style={{ width: "100%", borderRadius: "100%" }} />
            ) : (
              <div>
                {loading ? (
                  <LoadingOutlined rev={undefined} />
                ) : (
                  <PlusOutlined rev={undefined} />
                )}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item> */}
        </Form>
      </div>
    </Modal>
  );
};

export default CreateUser;
