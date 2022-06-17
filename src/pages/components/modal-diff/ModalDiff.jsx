// 数据修改前和修改后展示对比
import React, { useRef } from 'react';
import { Button, message } from 'antd';
import AppWrapper from 'components/app-wrapper/Index';
import FormDataDifferenceComparison from 'pages/common/FormDataDifferenceComparison'; // 表单数据差异比对公共弹窗
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const ModalDiff = () => {
  const childRef = useRef();

  const APIData = [{
    key: 1,
    parame: 'onRef',
    describe: '返回一个可变的 ref 对象',
    type: 'ref=> void',
    default: ''
  }, {
    key: 2,
    parame: 'onOk',
    describe: '修改确认的回调',
    type: 'Function()',
    default: ''
  }]

  const diffTableData = [{
    key: 1,
    parame: 'dataIndex',
    describe: '字段名',
    type: 'string',
    default: ''
  }, {
    key: 2,
    parame: 'title',
    describe: '描述',
    type: 'string',
    default: ''
  }, {
    key: 3,
    parame: 'new',
    describe: '修改后的数据',
    type: 'string',
    default: ''
  }, {
    key: 4,
    parame: 'old',
    describe: '修改前的数据',
    type: 'string',
    default: ''
  }]

  // 修改
  const handleModify = () => {
    const diffData = [{
      dataIndex: 'code',
      title: '代码',
      new: '001',
      old: 'cs001'
    }, {
      dataIndex: 'desc',
      title: '描述',
      new: '广东深广州市番禺区',
      old: '番禺区'
    }, {
      dataIndex: 'status',
      title: '状态',
      new: '生效',
      old: '失效'
    }, {
      dataIndex: 'startDate',
      title: '生效日期',
      new: '2022/05/05',
      old: '2022/05/20'
    }, {
      dataIndex: 'endDate',
      title: '失效日期',
      new: '2025/05/05',
      old: '2025/05/20'
    }]
    childRef.current && childRef.current.modifyVisible(true, diffData);
  }

  // 保存
  const handleSave = () => {
    setTimeout(() => {
      message.success("保存成功");
      childRef.current && childRef.current.modifyVisible(false);
    }, 1000)
  }

  return (
    <div>
      <AppWrapper
        title="数据修改前和修改后展示对比"
        descripe="HIS规范：用户使用的界面涉及到修改数据时需展示修改前及修改后的数据。"
        code={`import React from 'react';
import { Button } from 'antd';
import FormDataDifferenceComparison from 'pages/common/FormDataDifferenceComparison';

class demo extends React.Component {
  // 修改
  handleModify = () => {
    let diffData = [{
      dataIndex: 'code',
      title: '代码',
      new: 'cs001',
      old: 'cs00001'
    }, {
      dataIndex: 'desc',
      title: '描述',
      new: '测试数据',
      old: '测试'
    }]
    this.diffChild.modifyVisible && this.diffChild.modifyVisible(true, diffData);
  }
  
  // 保存
  handleSave = () => {
    console.log("保存中……")
  }
  
  render() {
    return (
      <div>
        <Button type="primary" onClick={handleModify}>编辑</Button>
        <FormDataDifferenceComparison onRef={ref => this.diffChild = ref} onOk={this.handleSave} />
      </div>
    )
  }
};
`}
      >
        <div>
          <Button type="primary" onClick={handleModify}>编辑</Button>
          {/*修改时差异提醒*/}
          <FormDataDifferenceComparison ref={childRef} onOk={handleSave} />
        </div>
      </AppWrapper>
      <AppAPI title="ModalDiff" data={APIData} />
      <AppAPI h2="none" title="diffData" data={diffTableData} />
      <AppQuore componentName="FormDataDifferenceComparison" />
    </div>
  )
};
export default ModalDiff;