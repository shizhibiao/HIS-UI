import React, { Component } from 'react';
import { DatePicker, Button, Input, message } from 'antd';
import { dayFormat } from 'tools/constants';
import moment from 'moment';
import './style/index.less';

const InputGroup = Input.Group;

/**
 * 注释：
 * format：为当前组件的日期格式，  ------必传
 * startChange 选择开始时间  ------必传
 * endChange 结束时间   ------必传
 * locale   用于配置国际化     ------非必传
 * label：为当前组件定义的label名  ------非必传
 * startDate：为开始时间，默认为当天 ------非必传
 * endDate：为结束时间 默认当天 ------非必传
 * showTime  是否展示时分秒  ------非必传
 * isShow  用于在弹框中，或者组件切换，当开始时间或者结束时间通过state获取值时，组件切换后value值不变 -----非必传
 * allowClear 是否显示清除按钮 -----非必传
 */

export default class AppDateRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formatType: true,
            startStatus: false,
            endStatus: false,
            startValue: this.props.startDate,
            endValue: this.props.endDate
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.startValue !== prevState.startDate) {
            return {
                nextProps: nextProp.startDate
            }
        }
        if (nextProps.endValue !== prevState.endDate) {
            return {
                endValue: nextProp.endDate
            }
        }
        return null
    }

    //控制弹框面板展示/隐藏问题
    handleStartOpenChange(e) {
        this.setState({
            startStatus: e
        })
    }

    handleEndOpenChange(e) {
        this.setState({
            endStatus: e
        })
    }

    //确认框，确认选择的时间，并关闭时间面板
    handleCloseTimeModal(name) {
        this.setState({
            [name]: false
        })
    }

    onChange = (field, name, value) => {
        this.setState({
            [field]: value,
            [name]: false
        });
    }

    onStartChange = (value) => {
        if (moment(value, dayFormat).unix() > (moment(this.state.endValue, dayFormat).unix())) {
            message.error('开始时间不能大于结束时间')
            return
        }
        this.onChange('startValue', 'startStatus', value);
        let startChange = this.props.startChange;
        startChange && startChange(value ? moment(value).format(this.props.format) : '');
    }

    onEndChange = (value) => {
        if (moment(this.state.startValue, dayFormat).unix() > (moment(value, dayFormat).unix())) {
            message.error('开始时间不能大于结束时间')
            return
        }
        this.onChange('endValue', 'endStatus', value);
        let endChange = this.props.endChange;
        endChange && endChange(value ? moment(value).format(this.props.format) : '');
    }

    //时间段
    changePeriodTime(name) {
        var date = new Date()
        if (name == 'today') {
            var { startChange, endChange } = this.props;
            startChange && startChange(moment(date).format(dayFormat))
            endChange && endChange(moment(date).format(dayFormat))
            this.setState({
                startValue: moment(date).format(dayFormat),
                endValue: moment(date).format(dayFormat),
                startStatus: false
            })
        } else if (name == 'three') {
            var code = moment().subtract(2, 'days')
            var data = moment(code).format(dayFormat)
            var { startChange, endChange } = this.props;
            startChange && startChange(data)
            endChange && endChange(moment(date).format(dayFormat))
            this.setState({
                startValue: data,
                endValue: moment(date).format(dayFormat),
                startStatus: false
            })
        } else if (name == 'seven') {
            var code = moment().subtract(6, 'days')
            var data = moment(code).format(dayFormat)
            var { startChange, endChange } = this.props;
            startChange && startChange(data)
            endChange && endChange(moment(date).format(dayFormat))
            this.setState({
                startValue: data,
                endValue: moment(date).format(dayFormat),
                startStatus: false
            })
        } else if (name == 'thirty') {
            var code = moment().subtract(29, 'days')
            var data = moment(code).format(dayFormat)
            var { startChange, endChange } = this.props;
            startChange && startChange(data)
            endChange && endChange(moment(date).format(dayFormat))
            this.setState({
                startValue: data,
                endValue: moment(date).format(dayFormat),
                startStatus: false
            })
        }
    }

    render() {
        const { startValue, endValue } = this.state;
        let { showTime, otherProps } = this.props;
        return (
            <div
                style={{
                    display: 'flex',
                    lineHeight: '32px',
                    width: this.props.totalwidth,
                    float: this.props.float,
                    margin: this.props.margin
                }}
            >
                <span style={{ width: this.props.labelwidth }}>{this.props.label}</span>
                <InputGroup style={{ width: this.props.width, display: 'flex' }} compact>
                    <DatePicker
                        {...otherProps}
                        showToday={false}
                        open={this.state.startStatus}
                        format={this.props.format}
                        disabled={this.props.disabled}
                        allowClear={this.props.allowClear && (this.props.allowClear == false ? false : true)}
                        value={startValue ? moment(startValue, dayFormat) : ((this.props.startDate ? moment(this.props.startDate, dayFormat) : ''))}
                        showTime={showTime ? { defaultValue: moment('00:00:00', 'HH:mm:ss') } : false}
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange.bind(this)}
                        renderExtraFooter={() => (
                            <div>
                                <Button size='small' onClick={this.changePeriodTime.bind(this, 'today')}>{this.props.locale == 'EN' ? 'today' : '今日'}</Button>
                                <Button size='small' style={{ marginLeft: 6 }} onClick={this.changePeriodTime.bind(this, 'three')}>{this.props.locale == 'EN' ? 'three days' : '近三日'}</Button>
                                <Button size='small' style={{ marginLeft: 6 }} onClick={this.changePeriodTime.bind(this, 'seven')}>{this.props.locale == 'EN' ? 'seven days' : '近七日'}</Button>
                                <Button size='small' style={{ marginLeft: 6 }} onClick={this.changePeriodTime.bind(this, 'thirty')}>{this.props.locale == 'EN' ? 'thirty days' : '近30日'}</Button>
                            </div>
                        )}
                    />
                    <Input value={this.props.locale == 'EN' ? 'To' : '至'} disabled={true} style={{ width: 39, color: '#999' }} />
                    <DatePicker
                        {...otherProps}
                        showToday={false}
                        open={this.state.endStatus}
                        disabled={this.props.disabled}
                        value={endValue ? moment(endValue, dayFormat) : (this.props.endDate ? moment(this.props.endDate, dayFormat) : '')}
                        format={this.props.format}
                        allowClear={this.props.allowClear && (this.props.allowClear == false ? false : true)}
                        showTime={showTime ? { defaultValue: moment('23:59:59', 'HH:mm:ss') } : false}
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndOpenChange.bind(this)}
                    />
                </InputGroup>
            </div>
        );
    }
}