// 分页
import React, { useState, useEffect } from 'react';
import AppWrapper from 'components/app-wrapper/Index';
import AppPagination from 'components/app-pagination/Index';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const PaginationPage = () => {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const tableData = [{
    key: 1,
    parame: 'page',
    describe: '当前页',
    type: 'number',
    default: '1'
  }, {
    key: 2,
    parame: 'current',
    describe: '当前页标志',
    type: 'number',
    default: '1'
  }, {
    key: 3,
    parame: 'size',
    describe: '当前页条数',
    type: 'number',
    default: '10'
  }, {
    key: 4,
    parame: 'total',
    describe: '列表总条数',
    type: 'number',
    default: '0'
  }, {
    key: 5,
    parame: 'search',
    describe: '用于分页组件页数变化，重新调用查询接口时，对于显示数据、page的刷新',
    type: 'string',
    default: 'search'
  }, {
    key: 6,
    parame: 'complete',
    describe: '表示是否展示   显示 XX 到 XX文本',
    type: 'boolean',
    default: ''
  }, {
    key: 7,
    parame: 'dataSource',
    describe: '当前列表数据',
    type: 'array',
    default: ''
  }, {
    key: 8,
    parame: 'onChange',
    describe: '页数改变的回调',
    type: 'Function(page, pageSize)',
    default: ''
  }, {
    key: 9,
    parame: 'onShowSizeChange',
    describe: '条数改变的回调',
    type: 'Function(page, pageSize)',
    default: ''
  }]

  useEffect(() => {
    getTableData();
  }, [page, size])

  // 页码改变的回调，参数是改变后的页码及每页条
  const handleChange = (nPage, nPageSize) => {
    setPage(nPage);
    setSize(nPageSize);
  }

  const getTableData = () => {
    setLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < 10; i++) {
        nDataSource.push({
          key: i + 1
        })
      }
      setTotal(100);
      setDataSource(nDataSource);
      setLoading(false);
    }, 500)
  }

  return (
    <div>
      <AppWrapper
        title="分页"
        descripe="HIS规范：涉及到分页的统一使用pagination公共组件。"
        code={`import React from 'react';
import CommonPagination from 'components/pagination/index';

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,  // 当前页数
      pageSize: 10, // 每页显示的条数
      total: 0, // 总条数
      search: '',
      tableData: [], // 数据源
    }
  }
  
  // 修改pageSize
  onShowSizeChange = (page, pageSize) => {
    this.setState({ page: 1, pageSize: pageSize }}
  }
  
  // 修改page
  onChange = (page, pageSize) => {
    this.setState({ page })
  }
  
  render() {
    let { page, pageSize, total, search, tableData } = this.state;
    return (
      <div>
        <CommonPagination
          page={page} 
          current={page}
          size={pageSize}
          total={total}
          search={search}
          onShowSizeChange={this.onShowSizeChange}
          complete={true}
          dataSource={tableData}
          onChange={this.onChange}
        />
      </div>
    )
  }
};
`}
      >
        <div>
          <AppPagination
            size='small'
            complete={true}
            pageSize='10' // 默认查询条数
            current={page}
            total={total}
            loading={loading}
            dataSource={dataSource}
            onChange={handleChange}
          />
        </div>
      </AppWrapper>
      <AppAPI title="Pagination" data={tableData} />
      <AppWrapper
        title="更多参数"
        descripe="3.0版本"
        url="https://3x.ant.design/components/pagination-cn/"
        descripe2="4.0版本"
        url2="https://ant.design/components/pagination-cn/"
      />
      <AppQuore componentName="CommonPagination" />
    </div>
  )
};

export default PaginationPage;