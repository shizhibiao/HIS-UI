/*
 * Creater:     柿子
 * CreateDate:  2022/04/21
 * Describe：   弹窗表单公共组件
 * */
import React, { Component } from 'react';
import { Modal } from 'antd';
import DynamicRenderimgForm from './DynamicRenderimgForm';

class PublicModalFormHooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  // 修改弹窗状态
  modifyVisible = (visible) => {
    this.setState({ visible })
  }

  // 获取数据
  getFieldsValue = () => {
    let fromValues = this.formRef && this.formRef.getFieldsValue();
    return {
      ...fromValues,
    }
  }

  // 重置
  resetFields = () => {
    this.formRef && this.formRef.resetFields();
  }

  // 保存
  handleSave = () => {
    this.formRef && this.formRef.handleSave().then(result => {
      if (!result?.error) {
        this.props.handleSave && this.props.handleSave(result)
      }
    });
  }

  // 关闭弹窗
  handleCancel = () => {
    let fieldsValue = this.getFieldsValue(); // 关闭弹窗的时候记录表单输入的值
    this.props.recordFormInput && this.props.recordFormInput(fieldsValue);
    this.modifyVisible(false);
  }

  render() {
    let { idField, width, formItemCol, rowData, formData } = this.props;
    let { visible } = this.state;
    return (
      <Modal
        title={(rowData && ((idField && rowData[idField]) || ('id' in rowData && rowData.id))) ? '编辑' : '新增'}
        okText={(rowData && ((idField && rowData[idField]) || ('id' in rowData && rowData.id))) ? '确认修改' : '保存'}
        cancelText={(rowData && ((idField && rowData[idField]) || ('id' in rowData && rowData.id))) ? '取消修改' : '取消'}
        visible={visible}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        width={width || '800px'}
        onOk={this.handleSave}
      >
        <DynamicRenderimgForm
          rowData={rowData || {}}
          formData={formData || {}}
          formItemCol={formItemCol ? formItemCol : { labelCol: 8, wrapperCol: 16 }}
          onRef={ref => this.formRef = ref}
        />
      </Modal>
    )
  }
};

export default PublicModalFormHooks;