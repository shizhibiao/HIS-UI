// 菜单明细维护
import React from 'react';
import { Table } from 'antd';
import store from 'store'

import AppPagination from 'components/app-pagination/Index';
/**
  需要传入一个名为 param 的对象，对象包含的参数如下：
  1、columns --- table的表头
  2、data --- table表格数据
  3、isOnRow --- 是否可以操作行 true||false 可以操作即需要传入，且需要提供相对应得方法(onClickRowPublic); 不可以操作即不需要传
  4、total --- 列表数据总条数，默认为0，需要分页则传，不需要则不传
  5、page --- 当前得页数，默认为第一页
  6、rowClassName --- 操作行之后是否需要给当前选中的那条数据加上背景颜色，需要的话即需提供 setRowClassNamePublic 方法
  7、height --- 表格的高度，默认为store.getState().tableHeight.y + 45 + 'px'
  8、x, y --- 表格的scroll值，x默认为900， y默认为store.getStqqIDtate().tableHeight.y
  9、pageSize --- 默认为10条则不传，默认为20条则传非空
  10、cls ---  初始化设置table的高度以及表体的高度 传入

注意: 
  1、当table数据请求成功之后需要调用此组件中的handleLoading关闭loading，或者在组件加载完成之后关闭也可以。
  2、必须向该组件传入一个compilePage方法改变分页条数与页数
*/

export default class PubilcTablePagination extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }
  componentWillUnmount() {
    // 组件销毁前将静止让setState修改state的状态
    this.setState = (state, callback) => { return; }
  }

  // 暴露给外部关闭loading的方法
  handleLoading = () => {
    this.setState({ loading: false })
  }

  // 页码改变的回调，参数是改变后的页码及每页条
  onChange = (page, pageSize) => {
    if (this.props && this.props.compilePage) {
      this.props.compilePage(page, pageSize)
    } else {
      this.props.handelThis.compilePage(page, pageSize);
    }
  }

  // 条数改变的回调
  onShowSizeChange = (current, size) => {
    if (this.props && this.props.compilePage) {
      this.props.compilePage(1, size)
    } else {
      this.props.handelThis.compilePage(1, size);
    }
  }

  // 显示分页总条数
  showTotal(total) {
    return `共 ${total} 条`;
  }

  render() {
    let isOnRow = this.props.param.isOnRow ? true : false;
    let isComplete = !this.props.param.isComplete ? true : false;
    let isOnHeadRow = this.props.param.isOnHeadRow ? true : false;
    let isRowSelection = this.props.param.isRowSelection ? true : false;
    let rowClassName = this.props.param.rowClassName ? true : false; // table checkBox
    let isPagination = (this.props.param.page && this.props.param.page > 0) || (this.props.param.page && this.props.param.page === 0) ? true : false;
    return (
      <div style={{ height: '100%' }} className={this.props.cls}>
        <Table
          style={{ height: this.props.cls && this.props.cls ? store.getState().tableHeight.y + this.props.wrapperHeight + 'px' : (this.props.param.height ? this.props.param.height : store.getState().tableHeight.y + 45 + 'px') }}
          columns={this.props.param.columns ? this.props.param.columns : []}
          dataSource={this.props.param.data ? this.props.param.data : []}
          pagination={false}
          onRow={isOnRow ? (record, index) => this.props.onClickRowPublic(record, index) : ''}
          onHeaderRow={(isOnHeadRow && (this.props.onClickHeadRowPublic)) ? (record) => this.props.onClickHeadRowPublic(record) : (record) => { }}
          rowSelection={isRowSelection ? this.props.rowSelectionPublic : null}
          rowClassName={rowClassName ? (record) => this.props.setRowClassNamePublic(record) : ''}
          scroll={{ x: this.props.param.x ? this.props.param.x : 900, y: this.props.param.y === 'N' ? false : (this.props.param.y ? this.props.param.y : store.getState().tableHeight.y) }}
          bordered
          loading={this.props.param.loading ? this.props.param.loading : false}
          className={this.props.param.TableClassName ? this.props.param.TableClassName : ''}
          rowKey={(row) => {
            return row.key || row.id;
          }}
        />
        {isPagination ? <AppPagination size={this.props.param.size ? this.props.param.size : "small"}
          current={this.props.param.page ? this.props.param.page : 1}
          total={this.props.param.total ? this.props.param.total : 0}
          search={this.props.param.search ? this.props.param.search : 'search'}
          onShowSizeChange={this.onShowSizeChange}
          complete={isComplete}
          dataSource={this.props.param.data ? this.props.param.data : []}
          loading={this.props.param.loading}
          onChange={this.onChange}
          pageSize={this.props.param.pageSize ? this.props.param.pageSize : ""} /> : ''}
      </div>
    );
  }
}
