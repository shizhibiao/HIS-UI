/*
 * Creater:     shizi
 * CreateDate:  2022/04/19
 * Describe：   表单数据差异比对公共弹窗
 * */

import React from 'react';
import { Modal } from 'antd';
import './style/index.less';

class FormDataDifferenceComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      diffData: []
    };
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  // 修改弹窗状态
  modifyVisible = (visible, diffData = []) => {
    this.setState({ visible, diffData })
  }

  render() {
    const { visible, diffData } = this.state;
    const { modalTitle } = this.props;
    return (
      <Modal
        title={modalTitle || "数据修改确认"}
        visible={visible}
        destroyOnClose={true}
        onOk={this.props.onOk || null}
        onCancel={() => this.modifyVisible(false)}
      >
        <div className='common-diff-modal-list'>
          <div className='common-diff-modal-list-item'>
            <span></span>
            <span>原数据</span>
            <span>修改后的数据</span>
          </div>
          {diffData && diffData.map((item, index) => {
            return (
              <div key={index} className='common-diff-modal-list-item'>
                <span title={item.title} className='ellipsis'>
                  {item.title}
                </span>
                <span title={item.old} className='ellipsis'>
                  {item.old}
                </span>
                <span title={item.new} className='ellipsis'>
                  {item.new}
                </span>
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
};

export default FormDataDifferenceComparison;