// 日期选择框
import React, { useState } from 'react';
import AppWrapper from 'components/app-wrapper/Index';
import AppDateRange from 'components/app-date-range/index';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const DatePickerPage = () => {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  // APItableDtate
  const APIData = [{
    key: 1,
    parame: 'isChange',
    describe: '是否修改',
    type: 'boolean',
    default: 'flase'
  }, {
    key: 2,
    parame: 'label',
    describe: '描述',
    type: 'string',
    default: '日期范围'
  }, {
    key: 3,
    parame: 'format',
    describe: '设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js',
    type: 'string',
    default: "'YYYY-MM-DD'"
  }, {
    key: 4,
    parame: 'width',
    describe: '总宽度',
    type: 'number',
    default: '300'
  }, {
    key: 5,
    parame: 'startDate',
    describe: '开始日期',
    type: 'string',
    default: ''
  }, {
    key: 6,
    parame: 'endDate',
    describe: '结束日期',
    type: 'string',
    default: ''
  }, {
    key: 7,
    parame: 'startChange',
    describe: '开始日期change事件',
    type: '(startData) => void',
    default: ''
  }, {
    key: 8,
    parame: 'endChange',
    describe: '结束日期change事件',
    type: '(endDate) => void',
    default: ''
  }];

  // 开始日期
  const handleStartChange = e => {
    setStartDate(e)
  }

  // 结束日期
  const handleEndChange = e => {
    setEndDate(e)
  }

  return (
    <div>
      <AppWrapper
        title="日期范围选择"
        descripe="HIS规范：涉及到日期范围选择的统一使用RangeDatePicker公共组件。"
        code={`import React from 'react';
import RangeDatePicker from 'components/rangePicker/index';

class demo extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      startDate: undefined,  // //开始日期
      endDate: undefined,  // //结束日期
    };
  }

  handleStartChange = e => {
    this.setState({ startDate: e })
  }

  handleEndChange = e => {
    this.setState({ endDate: e })
  }

  render() {
    let { startDate, endDate } = this.state;
    return (
      <RangeDatePicker 
        isChange={true}
        label="选择日期："
        format="YYYY-MM-DD"
        width={320}
        startDate={startDate}
        endDate={endDate}
        startChange={this.handleStartChange} 
        endChange={this.handleEndChange}  
      />
    )
  }
}`}
      >
        <AppDateRange
          label="选择日期："
          format="YYYY-MM-DD"
          width="320px"
          isChange={true}
          allowClear={false}
          startDate={startDate}
          endDate={endDate}
          startChange={handleStartChange}
          endChange={handleEndChange}
        />
      </AppWrapper>
      <AppAPI title="RangeDatePicker" data={APIData} />
      <AppWrapper
        title="更多参数"
        descripe="3.0版本"
        url="https://3x.ant.design/components/date-picker-cn/"
        descripe2="4.0版本"
        url2="https://ant.design/components/date-picker-cn/"
      />
      <AppQuore componentName="RangeDatePicker" />
    </div>
  )
};
export default DatePickerPage;