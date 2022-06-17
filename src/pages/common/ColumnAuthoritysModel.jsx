/*
 * Creater:     shizi
 * CreateDate:  2022/05/09
 * Describe：   列权限维护
 * */
import React, { useState } from 'react';
import { Modal } from 'antd';

const ColumnAuthoritysModel = () => {
  const [visible, setVisible] = useState(false);

  // 关闭弹窗
  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <Modal
      title="列权限维护"
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      width='800px'
    >
      列权限维护
    </Modal>
  )
};

export default ColumnAuthoritysModel;