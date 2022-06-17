// 下拉框
import React from 'react';
import { Select } from 'antd';
import AppWrapper from 'components/app-wrapper/Index';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const InputPage = () => {
  // APItableDtate
  const APIData = [{
    key: 1,
    parame: 'allowClear',
    describe: '支持清除',
    type: '必传',
    default: 'flase'
  }, {
    key: 2,
    parame: 'showSearch',
    describe: '使单选模式可搜索',
    type: '必传',
    default: 'false'
  }, {
    key: 3,
    parame: 'optionFilterProp',
    describe: '搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索。',
    type: '必传',
    default: 'seachprop'
  }, {
    key: 4,
    parame: 'placeholder',
    describe: '选择框默认文字',
    type: '必传',
    default: '请选择'
  }];

  // 下拉数据
  const selectData = [{
    id: '1',
    descripts: 'Option 1',
    descriptsSPCode: 'Option 1'
  }, {
    id: '2',
    descripts: 'Option 2',
    descriptsSPCode: 'Option 2'
  }, {
    id: '3',
    descripts: 'Option 3',
    descriptsSPCode: 'Option 3'
  }]

  return (
    <div>
      <AppWrapper
        title="下拉框"
        descripe="HIS规范：涉及到下拉框的统一使用React.$SelectOptions去渲染Option。"
        code={`import { Select } from 'antd';

// 下拉数据
const selectData = [{
  id: '1',
  descripts: '描述1'
}, {
  id: '2',
  descripts: '描述2'
}]

ReactDOM.render(
  <Select
    allowClear
    showSearch
    optionFilterProp="seachprop"
    placeholder="请选择"
  >
    {React.$SelectOptions(selectData, 'id', 'descripts')}
  </Select>
);
`}
      >
        <div>
          SelectOptions渲染：<Select
            allowClear
            showSearch
            optionFilterProp="seachprop"
            placeholder="请选择"
            style={{ width: '200px' }}
            getPopupContainer={() => document.getElementById('app-content-right')}
          >
            {selectData && Array.isArray(selectData) ? React.$SelectOptions(selectData) : ''}
          </Select>
        </div>
      </AppWrapper>
      <AppAPI title="Select" data={APIData} />
      <AppWrapper
        title="更多参数"
        descripe="3.0版本"
        url="https://3x.ant.design/components/select-cn/"
        descripe2="4.0版本"
        url2="https://ant.design/components/select-cn/"
      />
      <AppQuore componentName="Select" />
    </div>
  )
}
export default InputPage;