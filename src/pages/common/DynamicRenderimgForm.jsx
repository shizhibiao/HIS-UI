/*
 * Creater:     shizi
 * CreateDate:  2022/03/31
 * Describe：   表单动态渲染
 * */
import React, { Component } from 'react';
import { Form, Row, Col, Input, Radio, Select, DatePicker, Switch, Checkbox, Tag, Upload, message, TimePicker, Cascader, Icon, Tooltip } from 'antd';
import Moment from 'moment';
import { Util } from 'tools';

const { Option } = Select;
const { TextArea } = Input;

/**
  需要传入一个名为 param 的对象，对象包含的参数如下：
  1、formItemCol --- formItem的label和输入域的占比 
    示例：formItemCol={{ labelCol: 8, wrapperCol: 16 }}

  2、rowData --- 回显行数据（Object）

  3、formData --- 表单渲染数据
    示例:
    [{
      dataIndex: 'descripts',
      title: '库存项代码',
      typeCode: 'Input', // 输入框类型
      required: 'Y', // 是否必填
      disabled: 'Y', // 是否可操作
      doubt: '对该描述有疑问'
      col: 8, // 当前formItem的占比 - 比如说一行需要放三个输入域，就占8分（一行为24份）
    }]
*/

class DynamicRenderimgForm extends Component {
  constructor() {
    super();
    this.state = {
      rowData: {},
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //该方法内禁止访问this
    if (JSON.stringify(nextProps.rowData) !== JSON.stringify(prevState.rowData)) {
      //通过对比nextProps和prevState，返回一个用于更新状态的对象
      return {
        rowData: nextProps.rowData
      }
    }
    //不需要更新状态，返回null
    return null
  }

  componentDidUpdate(prevState) {
    if (JSON.stringify(prevState.rowData) !== JSON.stringify(this.state.rowData)) {
      this.handleDataTransformation();
    }
  }

  // 数据转化 - 表单赋值前
  handleDataTransformation = () => {
    let values = this.getDataIndexValues();
    this.setFieldsValue(this.formDataConversion(values));
  }

  // 获取当前表单字段
  getDataIndexValues = () => {
    let { formData } = this.props;
    let { rowData } = this.state;
    let values = {};
    for (var i = 0; i < formData.length; i++) {
      for (var keys in rowData) {
        if (formData[i].dataIndex === keys) {
          values[keys] = rowData[keys] !== '' ? rowData[keys] : undefined;
        }
      }
    }
    return values;
  }

  // 表单赋值
  setFieldsValue = (values) => {
    this.formRef.current.setFieldsValue({ ...values });
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || ile.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('图片格式异常');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // 渲染form表单
  renderForm = (formData) => {
    let { rowData, formItemCol } = this.props;
    return formData && formData.map((childItem, indexChild) => {
      let itemCol = 'formItemCol' in childItem ? childItem.formItemCol : formItemCol;
      return (
        <Col span={childItem && childItem.col ? childItem.col : (formItemCol && formItemCol.col ? formItemCol.col : 12)} key={indexChild}>
          {!childItem.typeCode ? (
            <div style={{ width: '100%', height: '50px' }}>
              {/* 占位 */}
            </div>
          ) : (
            childItem.typeCode === 'Switch' ? (
              <Form.Item
                valuePropName='checked'
                name={childItem.dataIndex}
                label={childItem.title}
                labelCol={{ span: itemCol.labelCol ? itemCol.labelCol : 12 }}
                wrapperCol={{ span: itemCol.wrapperCol ? itemCol.wrapperCol : 12 }}
                initialValue={rowData && rowData[childItem.dataIndex] ? (rowData[childItem.dataIndex] === 'Y' ? true : false) : (childItem.defaultValue === 'Y' ? true : false)}
                rules={[{ required: childItem.required && childItem.required === 'Y' ? true : false }]}
              >
                {this.getInput(childItem)}
              </Form.Item>
            ) : (
              childItem.typeCode === 'Tag' ? (
                <div style={{ paddingLeft: '48px', marginBottom: '12px' }}>
                  <Tag style={{ width: '100%', fontSize: '12pt', marginRight: 0 }} color='gold'>{childItem.title + '：' + (this.state[childItem.value] ? this.state[childItem.value] : '')}</Tag>
                </div>
              ) : (
                (childItem.typeCode === 'Upload' ? (
                  <Form.Item
                    valuePropName="fileList"
                    label={childItem.title}
                    extra={childItem.extra ? childItem.extra : ''}
                    labelCol={{ span: itemCol.labelCol ? itemCol.labelCol : 12 }}
                    wrapperCol={{ span: itemCol.wrapperCol ? itemCol.wrapperCol : 12 }}
                  >
                    {this.getInput(childItem)}
                  </Form.Item>
                ) :
                  <Form.Item
                    name={childItem.dataIndex}
                    label={'doubt' in childItem && childItem.doubt ? (
                      <span>
                        {childItem.title}
                        <Tooltip title={childItem.doubt}>
                          <Icon style={{ marginLeft: '4px', color: '#999' }} type="question-circle" />
                        </Tooltip>
                      </span>
                    ) : childItem.title}
                    labelCol={{ span: itemCol.labelCol ? itemCol.labelCol : 12 }}
                    wrapperCol={{ span: itemCol.wrapperCol ? itemCol.wrapperCol : 12 }}
                    initialValue={childItem.dataIndex && rowData && rowData[childItem.dataIndex] ?
                      ((childItem.typeCode === 'DatePicker' || childItem.typeCode === 'Date' || childItem.typeCode === 'RangePicker' || childItem.typeCode === 'Time') ? (childItem.typeCode === 'Time' ? Moment(rowData[childItem.dataIndex], 'HH:mm:ss') : Moment(rowData[childItem.dataIndex])) : rowData[childItem.dataIndex]) :
                      (childItem.defaultValue ? (
                        (childItem.typeCode === 'DatePicker' || childItem.typeCode === 'Date' || childItem.typeCode === 'RangePicker' || childItem.typeCode === 'Time') ? Moment(childItem.defaultValue) : childItem.defaultValue) : undefined)}
                    rules={[{ required: childItem.required && childItem.required === 'Y' ? true : false, message: '不能为空' }]}
                  >
                    {this.getInput(childItem)}
                  </Form.Item>)
              )))
          }
        </Col>
      )
    })
  }

  getInput = (item) => {
    if (item.typeCode === 'SearchSelect') { // 搜索下拉框
      return (
        <Select
          allowClear
          showSearch
          placeholder={item.placeholder ? item.placeholder : '请输入'}
          style={{ width: item && item.width ? (item.width + 'px') : '100%', paddingLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : '' }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          disabled={item.disabled === 'Y' ? true : false}
          onSearch={item.onSearch || null}
          onSelect={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e, item.dataIndex) : null}
          notFoundContent={null}
        >
          {item.detailItem && Array.isArray(item.detailItem) && item.detailItem.map((childItem, childIndex) => {
            let descripts = 'descIndex' in item && item.descIndex ? childItem[item.descIndex] : childItem.descripts;
            let titleCode = 'descCodeIndex' in item && item.descCodeIndex ? childItem[item.descCodeIndex] : childItem.descriptsSPCode;
            return (
              <Option
                disabled={item && item.disabled === 'Y' ? true : false}
                value={'valueIndex' in item && item.valueIndex ? childItem[item.valueIndex] : childItem.id}
                key={childIndex}
                title={descripts}
                seachprop={descripts + '^' + titleCode}
              >
                {descripts}
              </Option>
            )
          })}
        </Select>
      )
    } else if (item.typeCode === 'Select') { // 下拉框
      return (
        <Select
          showSearch
          optionFilterProp="seachprop"
          mode={item && item.mode ? item.mode : null} // mode="multiple" 多选
          placeholder={item.placeholder ? item.placeholder : "请选择"}
          allowClear
          style={{ width: item && item.width ? (item.width + 'px') : '100%', paddingLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : '' }}
          disabled={item.disabled === 'Y' ? true : false}
          onSelect={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e, item.dataIndex) : null}
        >
          {item.detailItem && item.detailItem ? React.$SelectOptions(
            item.detailItem,
            'valueIndex' in item && item.valueIndex ? item.valueIndex : 'id',
            'descIndex' in item && item.descIndex ? item.descIndex : 'descripts'
          ) : ''}
        </Select>
      );
    } else if (item.typeCode === 'Cascader') { // 级联选择
      return (
        <Cascader
          placeholder={item.placeholder ? item.placeholder : "请选择"}
          fieldNames={{
            label: item.labelFieldName ? item.labelFieldName : 'descripts',
            value: item.valueFieldName ? item.valueFieldName : 'id',
            children: item.childrenFieldName ? item.childrenFieldName : 'children'
          }}
          disabled={item.disabled === 'Y' ? true : false}
          multiple={item.multiple ? item.multiple : false}
          options={item.options}
          onChange={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e, item.dataIndex) : null}
        />
      );
    } else if ((item.typeCode === 'inputNumber') || (item.typeCode === 'InputNumber')) { // 数字框
      return (
        <Input
          placeholder={item.placeholder ? item.placeholder : "请输入"}
          disabled={item.disabled === 'Y' ? true : false}
          style={{
            width: item && item.width ? item.width : ('inputPaddingLeft' in item && item.inputPaddingLeft ? `calc(100% - ${item.inputPaddingLeft})` : '100%'),
            marginLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : ''
          }}
          type="number"
          className="input-number"
          onBlur={item.onBlur || null}
          onChange={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e.target.value, item.dataIndex) : null}
        />);
    } else if (item.typeCode === 'Checkbox') { // 多选框
      return (
        <div>
          <Checkbox.Group disabled={item.disabled === 'Y' ? true : false}>
            {item.detailItem && item.detailItem.item && item.detailItem.item.map((childItem, childIndex) => {
              return (
                <Checkbox disabled={childItem && childItem.disabled ? true : false} value={childItem.itemID} key={childIndex}>{childItem.itemValue}</Checkbox>
              )
            })}
          </Checkbox.Group>
        </div>
      );
    } else if (item.typeCode === 'Switch') { // 开关
      return (
        <Switch
          checkedChildren="是"
          unCheckedChildren="否"
          onChange={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e, item.dataIndex) : null}
          disabled={item.disabled === 'Y' ? true : false}
        />
      );
    } else if (item.typeCode === 'Radio') { // 单选框
      return (
        <Radio.Group disabled={item.disabled === 'Y' ? true : false}>
          {item.detailItem && item.detailItem.item && item.detailItem.item.map((childItem, childIndex) => {
            return (
              <Radio value={childItem.itemID} key={childIndex}>{childItem.itemValue}</Radio>
            )
          })}
        </Radio.Group>
      );
    } else if (item.typeCode === 'DatePicker' || item.typeCode === 'Date') { // 日期框
      return (
        <DatePicker
          disabled={item.disabled === 'Y' ? true : false}
          showTime={item && item.showTime ? item.showTime : false}
          style={{ width: item && item.width ? (item.width + 'px') : '100%', paddingLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : '' }}
        />
      );
    } else if (item.typeCode === 'Time') { // 时间框
      return (
        <TimePicker
          disabled={item.disabled === 'Y' ? true : false}
          style={{ width: item && item.width ? (item.width + 'px') : '100%', paddingLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : '' }}
        />
      )
    } else if (item.typeCode === 'Upload') { // 上传
      const uploadButton = (
        <div>
          {item.loading ? <Icon type="loading" /> : <Icon type="plus" />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      return (
        <Upload
          className="avatar-uploader"
          showUploadList={false}
          name={item && item.fileName ? item.fileName : item.title}
          action={item && item.action ? item.action : ''}
          listType={item.listType ? item.listType : 'picture-card'}
          onChange={(e) => this.handleChange(e, item && item.onChange ? item.onChange : null)}
          beforeUpload={item.beforeUpload ? item.beforeUpload : this.beforeUpload}
        >
          {item.imageUrl ? <img src={item.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      )
    } else if (item.typeCode === 'TextArea') {
      return (
        <TextArea
          allowClear
          placeholder={item.placeholder ? item.placeholder : "请输入"}
          style={{ width: item && item.width ? (item.width + 'px') : '100%', paddingLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : '' }}
          disabled={item.disabled === 'Y' ? true : false}
          onBlur={item.onBlur || null}
          onChange={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e.target.value, item.dataIndex) : null}
        />
      )
    } else {
      return (
        <Input
          placeholder={item.placeholder ? item.placeholder : "请输入"}
          style={{
            width: item && item.width ? (item.width + 'px') : ('inputPaddingLeft' in item && item.inputPaddingLeft ? `calc(100% - ${item.inputPaddingLeft})` : '100%'),
            marginLeft: 'inputPaddingLeft' in item && item.inputPaddingLeft ? item.inputPaddingLeft : ''
          }}
          disabled={item.disabled === 'Y' ? true : false}
          onBlur={item.onBlur || null}
          onChange={item && item.changeCallBack ? (e) => this.handleChangeCallBack(item.changeCallBack, item.callBackResult, e.target.value, item.dataIndex) : null}
        />
      )
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 图片上传change事件
  handleChange = (info, callback) => {
    if (info.file.status === 'uploading' || info.file.status === 'error') {
      callback && callback(info.file.status);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        callback && callback('done', imageUrl);
      });
    }
  };

  // change事件回调赋值
  handleChangeCallBack = (callBack, callBackDataIndex, e, dataIndex) => {
    // 根据传入进来的方法修改当前数据的callBackDataIndex字段value
    let fieldsValue = this.formRef.current.getFieldsValue();
    if (!callBackDataIndex) return;
    if (callBackDataIndex === 'Fn') {
      callBack && callBack(e, dataIndex, {
        ...fieldsValue,
        [dataIndex]: e
      });
      return;
    }
    if (dataIndex) {
      fieldsValue[dataIndex] = e;
    }
    if (callBackDataIndex.indexOf('reset=') > -1) { // 根据选择的下拉框数据重置其他相关类型的值
      callBack && callBack(e, dataIndex, fieldsValue);
      let dataIndexObj = callBackDataIndex.split('=')[1] ? JSON.parse(callBackDataIndex.split('=')[1]) : {};
      for (var key in dataIndexObj) {
        if (dataIndexObj[key] === '') {
          dataIndexObj[key] = undefined;
        }
      }
      this.formRef.current.setFieldsValue({
        ...dataIndexObj
      })
      return;
    }
    // console.log(fieldsValue)
    let result = callBack && callBack(fieldsValue, e, dataIndex);
    result.then((res) => {
      this.state[callBackDataIndex] = res;
      this.setState({})
    })
  }

  // 获取表单中的某个字段的值
  getFieldValue = (dataIndex) => {
    let value = '';
    if (dataIndex) {
      value = this.formRef.current.getFieldValue(dataIndex);
    }
    return value;
  }

  // 获取表单值
  getFieldsValue = () => {
    let values = this.formDataFormatConversion(this.formRef.current.getFieldsValue());
    return values;
  }

  handleSave = () => {
    return new Promise((resolve, reject) => {
      this.formRef && this.formRef.current && this.formRef.current.validateFields()
        // 验证成功
        .then(values => {
          resolve({
            ...this.getDataIndexValues(),
            ...this.formDataFormatConversion(values),
            error: false
          });
        })
        .catch(() => {
          resolve({ error: true });
        })
    })
  }

  // 重置表单
  resetFields = () => {
    this.formRef.current.resetFields(); //清空所有
  }

  // 表单数据格式转换 - 保存时
  formDataFormatConversion = (fieldsValues) => {
    let { formData } = this.props;
    if (formData && formData.length > 0) {
      for (var i = 0; i < formData.length; i++) {
        for (var keys in fieldsValues) {
          if (formData[i].dataIndex === keys) {
            if (formData[i].typeCode === 'SearchSelect') {
              fieldsValues[formData[i].valueID] = Util.returnDataCccordingToAttributes(formData[i].detailItem, fieldsValues[keys], 'descripts')?.id; // 剂量单位
            } else if (formData[i].typeCode === 'Switch') { // 开关
              fieldsValues[keys] = fieldsValues[keys] ? 'Y' : 'N';
            } else if (formData[i].typeCode === 'DatePicker' || formData[i].typeCode === 'Date') {
              if (formData[i].showTime) {
                fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys]).format('YYYY-MM-DD HH:mm:ss'); // 日期时间
              } else {
                fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys]).format('YYYY-MM-DD'); // 日期
              }
            } else if (formData[i].typeCode === 'Time') { // 时间
              fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys]).format('HH:mm:ss');
            }
          }
        }
      }
    }
    return fieldsValues
  }

  // 表单数据转换 - 使用
  formDataConversion = fieldsValues => {
    let { formData } = this.props;
    if (formData && formData.length > 0) {
      for (var i = 0; i < formData.length; i++) {
        for (var keys in fieldsValues) {
          if (formData[i].dataIndex === keys) {
            if (formData[i].typeCode === 'Switch') { // 开关
              fieldsValues[keys] = fieldsValues[keys] === 'Y' ? true : false;
            } else if (formData[i].typeCode === 'DatePicker' || formData[i].typeCode === 'Date') {
              if (formData[i].showTime) {
                fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys], 'YYYY-MM-DD HH:mm:ss'); // 日期时间
              } else {
                fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys], 'YYYY-MM-DD'); // 日期
              }
            } else if (formData[i].typeCode === 'Time') { // 时间
              fieldsValues[keys] = fieldsValues[keys] && Moment(fieldsValues[keys], 'HH:mm:ss');
            }
          }
        }
      }
    }
    return fieldsValues
  }

  render() {
    let { formData } = this.props;
    return (
      <Form ref={this.formRef}>
        <Row>
          {formData && Array.isArray(formData) ? this.renderForm(formData) : ''}
        </Row>
      </Form>
    )
  }
};

export default DynamicRenderimgForm;