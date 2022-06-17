// 组件菜单数据
export default [{
  key: '1',
  title: '开发指南',
  children: [
    {
      key: '1-1',
      parentKey: '1',
      title: '快速上手',
      path: '/components/start'
    },
    {
      key: '1-2',
      parentKey: '2',
      title: '暗黑模式',
      path: ''
    },
  ],
}, {
  key: '2',
  title: '设计指南',
  path: ''
}, {
  key: '3',
  title: '组件',
  children: [
    {
      key: '3-1',
      title: '通用',
      isGroup: true,
      children: [{
        key: '3-1-1',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Button 按钮',
        path: '/components/button',
        descripe: '按钮是一种命令组件，可发起一个即时操作。',
        anchorMenu: [{
          key: '1',
          title: '新增按钮',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-2',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Icon 图标',
        path: '/components/icon',
        descripe: '这里有 Arco Design 内置的大量图标。',
        anchorMenu: [{
          key: '1',
          title: '阿里iconfont',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-3',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Input 输入框',
        path: '/components/input',
        descripe: '基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。',
        anchorMenu: [{
          key: '1',
          title: '数字输入框',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-4',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Select 下拉框',
        path: '/components/select',
        descripe: '当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。',
        anchorMenu: [{
          key: '1',
          title: '下拉框',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-5',
        parentKey: '3',
        groupKey: '3-1',
        title: 'DatePicker 日期选择框',
        path: '/components/date-picker',
        descripe: '输入或选择日期的控件。',
        anchorMenu: [{
          key: '1',
          title: '日期范围选择',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-6',
        parentKey: '3',
        groupKey: '3-1',
        title: 'From 动态表单',
        path: '/components/form',
        descripe: '高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。',
        anchorMenu: [{
          key: '1',
          title: '动态表单',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-7',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Pagination 分页',
        path: '/components/pagination',
        descripe: '采用分页的形式分隔长列表，每次只加载一个页面。',
        anchorMenu: [{
          key: '1',
          title: '分页',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-8',
        parentKey: '3',
        groupKey: '3-1',
        title: 'Table 表格',
        path: '/components/table',
        descripe: '展示行列数据。',
        anchorMenu: [{
          key: '1',
          title: '表格',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-9',
        parentKey: '3',
        groupKey: '3-1',
        title: 'ModalForm 表单弹窗',
        path: '/components/modal-form',
        descripe: '弹窗新增表单内容。',
        anchorMenu: [{
          key: '1',
          title: '表单弹窗',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '更多参数',
        }, {
          key: '4',
          title: '引用界面',
        }]
      }, {
        key: '3-1-10',
        parentKey: '3',
        groupKey: '3-1',
        title: 'ModalDiff 差异对比',
        path: '/components/modal-diff',
        descripe: '数据差异对比展示。',
        anchorMenu: [{
          key: '1',
          title: '数据修改前和修改后展示对比',
        }, {
          key: '2',
          title: 'API',
        }, {
          key: '3',
          title: '引用界面',
        }]
      }]
    }, {
      key: '3-2',
      title: '使用示例',
      isGroup: true,
      children: [{
        key: '3-2-1',
        parentKey: '3',
        groupKey: '3-2',
        title: '单表增删改查',
        path: '/components/table-examples',
        descripe: '用于操作单张表的增删改查功能'
      }, {
        key: '3-2-2',
        parentKey: '3',
        groupKey: '3-2',
        title: '父子表增删改查',
        path: '/components/double-table-examples',
        descripe: '用于操作父子表的增删改查功能'
      }]
    }
  ],
}];