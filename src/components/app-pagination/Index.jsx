import React, { Component } from 'react';
import { Select, Input, message, Spin } from 'antd';
import { LoadingOutlined, ReloadOutlined, StepBackwardOutlined, CaretLeftOutlined, CaretRightOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Utils } from 'tools';
import { PAGE_NUM_STATUS, PAGE_NUM_MORE_STATUS } from 'tools/constants';
import './style/index.less';

/**
 * 注释：
 * PAGE_NUM_STATUS, PAGE_NUM_MORE_STATUS 为下拉页数选择常量
 * size：为当前分页默认条数，small为默认10条，large为默认50条  -----必传
 * page：表示分页传给后台的当前页，通过state去改变 -----必传
 * total：为后端返回的当前接口获取数据的总数  -----必传
 * onChange 为左右四个按钮的查询方法  -----必传
 * complete 表示是否展示   显示 XX 到 XX文本
 * dataSource 表示查询获取的数据源  -----必传
 * loading 为加载中组件的参数，用于当接口加载速度慢时，给用户的一个提示  -----必传
 * 
 * 
 * 注：该组件可能会不满足于部分场景，可根据当前组件业务进行组件修改
 */
class AppPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSelect: PAGE_NUM_STATUS,
            pageDetail: PAGE_NUM_MORE_STATUS,
            curPageSelect: (!props.pageSize || props.pageSize !== '10') ? (props.pageSize === '50' ? PAGE_NUM_STATUS[3].code : PAGE_NUM_STATUS[1].code) : PAGE_NUM_STATUS[0].code,
            curPageDetail: (!props.pageSize || props.pageSize !== '50') ? (props.pageSize === '200' ? PAGE_NUM_MORE_STATUS[2] : PAGE_NUM_MORE_STATUS[1].code) : PAGE_NUM_MORE_STATUS[0].code,
            pageCount: 1,
            pageSum: this.props.size == 'small' ? PAGE_NUM_STATUS[0].code : PAGE_NUM_MORE_STATUS[0].code
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //该方法内禁止访问this
        if (nextProps.current !== prevState.page) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                page: nextProps.current
            }
        }
        //不需要更新状态，返回null
        return null
    }

    //修改pageSize
    changePageSize(e) {
        var num = 0;
        if (this.props.size == 'small') {
            num = this.state.curPageSelect
        } else {
            num = this.state.curPageDetail
        }
        if (e.keyCode == '13') {
            var { onChange } = this.props;
            onChange && onChange(this.state.page, num)
        }
    }

    //点击按钮，切换不同的页签
    changeCommonPageSize(name) {
        var { onChange } = this.props;
        var num = 0;
        if (this.props.size == 'small') {
            num = this.state.curPageSelect
        } else {
            num = this.state.curPageDetail
        }
        var page = 0;
        if (name == 'home') {
            page = 1;
            onChange && onChange(page, num)
        } else if (name == 'last') {
            page = parseInt(this.state.page) - 1;
            onChange && onChange(page, num)
        } else if (name == 'next') {
            if (!isNaN(this.state.page) && !Utils.isEmpty(this.state.page)) {
                page = parseInt(this.state.page) + 1;
                onChange && onChange(page, num)
            } else {
                var count = 1;
                page = count + 1;
                onChange && onChange(page, num)
            }
        } else if (name == 'end') {
            page = Math.ceil(this.props.total / num)
            onChange && onChange(page, num)
        } else if (name == 'search') {
            page = parseInt(this.state.page)
            onChange && onChange(page, num)
        }
        this.setState({
            page: page,
        })
    }

    handleSearchPage(name, page) {
        var { onChange } = this.props;
        this.setState({
            page: 1,
            [name]: page
        })
        onChange && onChange(1, page)
    }

    //输入页数校验，显示输入数据不能大于当前总页数
    commonInputChange(name, num, e) {
        var value = e.target.value;
        if (isNaN(value) && !Utils.isEmpty(value)) {
            message.error('请输入一个正确的数字！')
            return
        }
        if (value > Math.ceil(this.props.total / num)) {
            message.error('输入页数不能大于当前总页数')
            return
        }
        this.setState({
            [name]: value
        })
    }

    render() {
        var { pageSelect, pageDetail } = this.state;
        var pageSelectOption = []
        //针对数据量的大小定义不同的条数选择
        if (this.props.size == 'small') {
            pageSelectOption = pageSelect;
        } else {
            pageSelectOption = pageDetail;
        }
        //下拉框条数取页数数据
        var num = 0;
        if (this.props.size == 'small') {
            num = this.state.curPageSelect
        } else {
            num = this.state.curPageDetail
        }
        const iconAttr = {
            spin: this.props.loading,
            className: 'common-icon-style',
            style: { color: '#1999db' },
            onClick: this.changeCommonPageSize.bind(this, 'search')
        }
        const antIcon = this.props.loading == true ? <LoadingOutlined {...iconAttr} /> : <ReloadOutlined {...iconAttr} />
        //计算当前页显示的数据
        var pageCount = !Utils.isEmpty(this.state.page) ? (this.props.size == 'small' ? (this.state.page == 1 ? 1 :
            parseInt(this.state.curPageSelect) * (parseInt(this.state.page) - 1) + 1) :
            (this.state.page == 1 ? 1 : parseInt(this.state.curPageDetail) + 1)) : 0
        var pageSum = !Utils.isEmpty(this.state.page) ? (this.props.size == 'small' ? (this.state.page == '1' ? this.state.curPageSelect :
            ((parseInt(this.state.page) - 1) * parseInt(this.state.curPageSelect) + this.props.dataSource.length)) :
            (this.state.page == '1' ? this.state.curPageDetail :
                (parseInt(this.state.curPageDetail) + this.props.dataSource.length))) : 0;
        return (
            <div className="page-size-pagination">
                <div style={{ display: 'flex', float: 'right', marginRight: '20px' }}>
                    <div>
                        {(this.props.size == 'small' || this.props.size == 'large') && !this.props.complete ? null : (
                            <span>
                                {!Utils.isEmpty(this.props.dataSource) ? pageCount : 0}
                                {this.props.company ? this.props.company : ""}
                                到
                                {!Utils.isEmpty(this.props.dataSource) ? pageSum : 0}
                                {this.props.company ? this.props.company : "条"}
                                ，
                            </span>
                        )}
                        <span>共{this.props.total || 0}{this.props.company ? this.props.company : "条"}</span>
                    </div>
                    <div>
                        {this.state.page > 1 ? (
                            <span>
                                <StepBackwardOutlined
                                    className='common-icon-style'
                                    style={{ color: '#1999db' }}
                                    onClick={this.changeCommonPageSize.bind(this, 'home')}
                                />
                                <CaretLeftOutlined
                                    className='common-icon-style'
                                    style={{ color: '#1999db' }}
                                    onClick={this.changeCommonPageSize.bind(this, 'last')}
                                />
                            </span>
                        ) : (
                            <span>
                                <StepBackwardOutlined
                                    className='common-icon-style'
                                    style={{ color: '#ccc', cursor: 'no-drop' }}
                                />
                                <CaretLeftOutlined
                                    className='common-icon-style'
                                    style={{ color: '#ccc', cursor: 'no-drop' }}
                                />
                            </span>
                        )}
                        第<Input
                            style={{ width: 50 }}
                            size='small'
                            value={this.state.page}
                            onKeyDown={this.changePageSize.bind(this)}
                            onChange={this.commonInputChange.bind(this, 'page', num)}
                        />页&nbsp;&nbsp; 共{Math.ceil(this.props.total / num) || 0}页
                        {this.state.page == (Math.ceil(this.props.total / num) || 1) ? (
                            <span>
                                <CaretRightOutlined
                                    className='common-icon-style'
                                    style={{ color: '#ccc', cursor: 'no-drop' }}
                                />
                                <StepForwardOutlined
                                    className='common-icon-style'
                                    style={{ color: '#ccc', cursor: 'no-drop' }}
                                />
                            </span>
                        ) : (
                            <span>
                                <CaretRightOutlined
                                    className='common-icon-style'
                                    style={{ color: '#1999db' }}
                                    onClick={this.changeCommonPageSize.bind(this, 'next')}
                                />
                                <StepForwardOutlined
                                    className='common-icon-style'
                                    style={{ color: '#1999db' }}
                                    onClick={this.changeCommonPageSize.bind(this, 'end')}
                                />
                            </span>
                        )}
                        <Spin indicator={antIcon} size='small' />
                        <Select
                            size='small'
                            style={{ width: 80 }}
                            className='common-icon-style'
                            value={this.props.size == 'small' ? this.state.curPageSelect : this.state.curPageDetail}
                            onSelect={this.handleSearchPage.bind(this, this.props.size == 'small' ? 'curPageSelect' : 'curPageDetail')}
                        >
                            {pageSelectOption && Array.isArray(pageSelectOption) ? React.$SelectOptions(pageSelectOption, 'code', 'name') : ''}
                        </Select>
                    </div>
                </div>
            </div>
        );
    };
};

export default AppPagination;