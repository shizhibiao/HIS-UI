// 表格
import React, { useState, useEffect } from 'react';
import AppWrapper from 'components/app-wrapper/Index';
import PubilcTablePagination from 'pages/common/PubilcTablePagination';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const TablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const staticColumns = [{
    key: 1,
    title: '代码',
    dataIndex: 'code',
    align: "center",
  }, {
    key: 2,
    title: '描述',
    dataIndex: 'descripts',
    align: "center",
  }, {
    key: 3,
    title: '英文描述',
    dataIndex: 'enDescripts',
    align: "center",
  }];

  const APIData = [{
    key: 1,
    parame: 'param',
    describe: '组件所需参数，如下Param',
    type: 'object',
    default: '{ }'
  }, {
    key: 2,
    parame: 'compilePage',
    describe: '修改页数/条数的回调',
    type: 'Function(page, pageSize)',
    default: ''
  }, {
    key: 3,
    parame: 'onClickRowPublic',
    describe: '设置行属性',
    type: 'Function(record, index)',
    default: ''
  }, {
    key: 4,
    parame: 'setRowClassNamePublic',
    describe: '表格行的类名',
    type: 'Function(record, index)',
    default: ''
  }, {
    key: 5,
    parame: 'rowSelectionPublic',
    describe: '表格行是否可选择',
    type: 'object',
    default: 'null'
  }, {
    key: 6,
    parame: 'onClickHeadRowPublic',
    describe: '设置头部行属性',
    type: 'Function(column, index)',
    default: ''
  }]

  const paramData = [{
    key: 1,
    parame: 'columns',
    describe: '表格列的配置描述',
    type: 'array',
    default: '[ ]'
  }, {
    key: 2,
    parame: 'data',
    describe: '表格数据',
    type: 'array',
    default: '[ ]'
  }, {
    key: 3,
    parame: 'total',
    describe: '总条数',
    type: 'number',
    default: '0'
  }, {
    key: 4,
    parame: 'page',
    describe: '当前页',
    type: 'number',
    default: '1'
  }, {
    key: 5,
    parame: 'pageSize',
    describe: '当前页默认的条数',
    type: 'number',
    default: '10'
  }, {
    key: 6,
    parame: 'loading',
    describe: '加载状态',
    type: 'boolean',
    default: 'false'
  }, {
    key: 7,
    parame: 'height',
    describe: '表格高度',
    type: 'string',
    default: "store.getState().tableHeight.y + 45 + 'px'"
  }, {
    key: 8,
    parame: 'x',
    describe: '表格的scroll值',
    type: 'number',
    default: '900'
  }, {
    key: 9,
    parame: 'y',
    describe: '表格的scroll值',
    type: 'number',
    default: 'store.getState().tableHeight.y'
  }, {
    key: 10,
    parame: 'isOnRow',
    describe: '是否可以操作行',
    type: 'boolean',
    default: 'false'
  }, {
    key: 11,
    parame: 'rowClassName',
    describe: '选中行是否需要选中颜色',
    type: 'boolean',
    default: 'false'
  }, {
    key: 12,
    parame: 'isOnHeadRow',
    describe: '是否允许设置头部行属性',
    type: 'boolean',
    default: 'false'
  }, {
    key: 13,
    parame: 'isRowSelection',
    describe: '表格行是否可选择',
    type: 'boolean',
    default: 'false'
  }, {
    key: 14,
    parame: 'TableClassName',
    describe: '表格类名',
    type: 'string',
    default: ''
  }, {
    key: 15,
    parame: 'cls',
    describe: '表格父级div类名',
    type: 'string',
    default: ''
  }]

  useEffect(() => {
    getTableData();
  }, [page, pageSize])

  const getTableData = () => {
    setLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < 10; i++) {
        nDataSource.push({
          key: i + 1,
          code: '001' + Math.random() * 10,
          descripts: '测试' + Math.floor(Math.random() * 10),
          enDescripts: 'ceshi' + Math.floor(Math.random() * 10)
        })
      }
      setTotal(100);
      setTableData(nDataSource);
      setLoading(false);
    }, 500)
  }

  const compilePage = (nPage, nPageSize) => {
    setPage(nPage);
    setPageSize(nPageSize);
  }

  // 组件所需参数
  const param = {
    // 表头配置
    columns: staticColumns,
    // 表格数据
    data: tableData,
    // 数据总条数
    total,
    // 当前页数
    page,
    pageSize: "10",
    loading,
    // 表格的宽度
    x: 500,
    y: 250,
    height: '310px'
  }
  return (
    <div>
      <AppWrapper
        title="表格"
        descripe="HIS规范：涉及到表格的统一使用PubilcTablePagination公共组件。"
        code={`import React from 'react';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      tableData: [],
      total: 0,
      page: 1,
      loading: false,
      totalwidth: 800,
      desc: ''
    }
  }
  
  componentDidMount() {
    this.getTableColumns();
  }
  
  // 获取列表columns - 尽量走维护
  getTableColumns = () => {
    let columns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: 'center',
    }, {
      key: 2,
      title: '名称',
      dataIndex: 'descripts',
      align: 'center', 
    }];
    this.setState({ columns });
  }
  
  // 提供修改page和pageSize的回调函数
  compilePage = (page, pageSize) => {
    // 修改page，或者pageSize
    this.setState({ page, pageSize, loading: true }, () => {
      // 重新调用查询方法
      this.getTableData();
    })
  }
  
  // 获取表格数
  getTableData = () => {
    try {
      let { desc, pageSize, page } = this.state;
      let data = {
        params: [{
          desc: desc,
        }],
        pagination: [{
          pageSize,
          currentPage: page
        }]
      }
      let res = await React.$asyncPost(this, '02020377', data);
      let tableData = res.result && 'rows' in res.result ? Util.addKeyValueToDataSource(res.result.rows) : [];
      this.setState({ tableData, total: res.result.total, loading: false });
    } catch (error) {
      this.setState({ tableData: [], total: 0, loading: false })
    }
  }
  
  render() {
    let { columns, tableData, total, page, loading, totalwidth } = this.state;
    let param = {
      // 表头配置
      columns,
      // 表格数据
      data: tableData,
      // 数据总条数
      total,
      // 当前页数
      page,
      pageSize: "20",
      loading,
      // 表格的宽度
      x: totalwidth,
      y: 500,
      height: 545
    }
    
    return (
      <div>
        <PubilcTablePagination param={param} compilePage={this.compilePage} />
      </div>
    )
  }
};

export default Demo;
`}
      >
        <div>
          <PubilcTablePagination param={param} compilePage={compilePage} />
        </div>
      </AppWrapper>
      <AppAPI title="Table" data={APIData} />
      <AppAPI h2="none" title="Param" data={paramData} />
      <AppWrapper
        title="更多参数"
        descripe="3.0版本"
        url="https://3x.ant.design/components/table-cn/"
        descripe2="4.0版本"
        url2="https://ant.design/components/table-cn/"
      />
      <AppQuore componentName="PubilcTablePagination" />
    </div>
  )
}
export default TablePage;