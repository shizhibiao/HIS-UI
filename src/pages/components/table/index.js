export const Button = {
  title: '表格',
  path: 'table',
  componentName: 'Table',
  component: () => import('./Table')
};

export const TableExamples = {
  title: '单表增删改查示例',
  path: 'table-examples',
  componentName: 'TableExamples',
  component: () => import('./TableExamples')
};

export const DoubleTableExample = {
  title: '双表增删改查示例',
  path: 'double-table-examples',
  componentName: 'DoubleTableExample',
  component: () => import('./DoubleTableExample')
};