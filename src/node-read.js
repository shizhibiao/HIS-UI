const fs = require('fs');

// 组件数据
let conponentData = {
  Button: {
    title: '新增按钮',
    // matching: `className="add-btn add-btn-nohover"`, // 新版
    matching: `Button icon="plus"`, // 现阶段系统中
    data: []
  },
  Icon: {
    title: 'iconfont图标',
    matching: `className='iconfont`,
    data: []
  },
  Input: {
    title: '自定义数字输入框',
    matching: `className="input-number"`,
    data: []
  },
  Select: {
    title: '下拉框数据获取',
    matching: `React.$SelectOptions`,
    data: []
  },
  RangeDatePicker: {
    title: '日期范围',
    matching: 'components/rangePicker/index',
    data: []
  },
  DynamicRenderingForm: {
    title: '动态表单',
    matching: 'pages/common/DynamicRenderingForm',
    data: []
  },
  CommonPagination: {
    title: '分页',
    matching: 'components/pagination/index',
    data: []
  },
  PubilcTablePagination: {
    title: '表格',
    matching: 'pages/common/PubilcTablePagination.jsx',
    data: []
  },
  PublicModalFormHooks: {
    title: '表单弹窗',
    matching: 'pages/common/PublicModalFormHooks',
    data: []
  },
  FormDataDifferenceComparison: {
    title: '差异对比',
    matching: 'pages/common/FormDataDifferenceComparison',
    data: []
  }
};

//删除左右两端的空格
function trim(str) {
  if (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  } else {
    return ''
  }
}

function fsReaddir(catalogue) {
  // 读取文件夹中所有文件及文件夹
  var list = fs.readdirSync(catalogue)
  list.forEach((v, i) => {
    var url = catalogue + '/' + v; // 拼接路径
    var stats = fs.statSync(url); // 读取文件信息
    if (stats.isFile()) { // 判断是文件还是文件夹
      if (url && url.indexOf('.jsx') > -1) { // 判断是否为jsx文件
        let data = fs.readFileSync(url); // 读取
        let toStringData = data && data.toString();
        let componentDescripe = ''; // 组件描述
        let componentCreater = ''; // 组件创建人
        let componentDate = ''; // 组件创建日期
        let splitColumnData = toStringData.split('\n');
        // 获取组件描述
        if (splitColumnData[0].indexOf('///') > -1) { // 匹配单行注释三个斜杠
          componentDescripe = trim(splitColumnData[0].split('///')[1]);
        } else if (splitColumnData[0].indexOf('//') > -1) { // 匹配单行注释
          componentDescripe = trim(splitColumnData[0].split('//')[1]);
        } else {
          // 描述
          for (let i = 0; i < splitColumnData.length; i++) {
            let currentRecord = splitColumnData[i];
            if (i <= 6) { // 取前面六行
              if (currentRecord.indexOf('* descripts：') > -1) {
                componentDescripe = trim(currentRecord.split('* descripts：')[1]);
                break;
              } else if (currentRecord.indexOf('* descripts:') > -1) {
                componentDescripe = trim(currentRecord.split('* descripts:')[1]);
                break;
              } else if (currentRecord.indexOf('* descripts') > -1) {
                componentDescripe = trim(currentRecord.split('* descripts')[1]);
                break;
              } else if (currentRecord.indexOf('* Describe：') > -1) {
                componentDescripe = trim(currentRecord.split('* Describe：')[1]);
                break;
              } else if (currentRecord.indexOf('* Describe') > -1) {
                componentDescripe = trim(currentRecord.split('* Describe')[1]);
                break;
              } else if ((currentRecord.indexOf('* ') > -1) && trim(currentRecord.split('* ')[1]) && trim(currentRecord.split('* ')[1]).length > 3) { // 有些* 这种情况会注释名字
                componentDescripe = trim(currentRecord.split('* ')[1]);
              }
            }
          }

          // 创建人
          for (let i = 0; i < splitColumnData.length; i++) {
            let currentRecord = splitColumnData[i];
            if (i <= 6) { // 取前面六行
              if (currentRecord.indexOf('Creator：') > -1) {
                componentCreater = trim(currentRecord.split('Creator：')[1]);
                break;
              } else if (currentRecord.indexOf('Creator:') > -1) {
                componentCreater = trim(currentRecord.split('Creator:')[1]);
                break;
              } else if (currentRecord.indexOf('Creator') > -1) {
                componentCreater = trim(currentRecord.split('Creator')[1]);
                break;
              } else if ((currentRecord.indexOf('Creater：') > -1)) {
                componentCreater = trim(currentRecord.split('Creater：')[1]);
                break;
              } else if ((currentRecord.indexOf('Creater:') > -1)) {
                componentCreater = trim(currentRecord.split('Creater:')[1]);
                break;
              } else if ((currentRecord.indexOf('Creater') > -1)) {
                componentCreater = trim(currentRecord.split('Creater')[1]);
                break;
              } else if ((currentRecord.indexOf('Create：') > -1)) {
                componentCreater = trim(currentRecord.split('Create：')[1]);
                break;
              } else if ((currentRecord.indexOf('Create:') > -1)) {
                componentCreater = trim(currentRecord.split('Create:')[1]);
                break;
              } else if ((currentRecord.indexOf('Create') > -1) && currentRecord.indexOf('CreateDate') < 0) {
                componentCreater = trim(currentRecord.split('Create')[1]);
                break;
              }
            }
          }

          // 创建日期
          for (let i = 0; i < splitColumnData.length; i++) {
            let currentRecord = splitColumnData[i];
            if (i <= 6) { // 取前面六行
              if (currentRecord.indexOf('* CreatDate：') > -1) {
                componentDate = trim(currentRecord.split('* CreatDate：')[1]);
                break;
              } else if (currentRecord.indexOf('* CreatDate:') > -1) {
                componentDate = trim(currentRecord.split('* CreatDate:')[1]);
                break;
              } else if (currentRecord.indexOf('* CreatDate') > -1) {
                componentDate = trim(currentRecord.split('* CreatDate')[1]);
                break;
              } else if (currentRecord.indexOf('* CreateDate：') > -1) {
                componentDate = trim(currentRecord.split('* CreateDate：')[1]);
                break;
              } else if (currentRecord.indexOf('* CreateDate:') > -1) {
                componentDate = trim(currentRecord.split('* CreateDate:')[1]);
                break;
              } else if (currentRecord.indexOf('* CreateDate') > -1) {
                componentDate = trim(currentRecord.split('* CreateDate')[1]);
                break;
              } else if (currentRecord.indexOf('* LastModifiedDate：') > -1) {
                componentDate = trim(currentRecord.split('* LastModifiedDate：')[1]);
                break;
              } else if (currentRecord.indexOf('* LastModifiedDate') > -1) {
                componentDate = trim(currentRecord.split('* LastModifiedDate')[1]);
                break;
              }
            }
          }
        }

        // 根据界面的引用将数据归类
        for (let key in conponentData) {
          let importInfo = conponentData[key] && conponentData[key].matching ? conponentData[key].matching : '';
          if (importInfo && toStringData && toStringData.indexOf(importInfo) > -1) {
            conponentData[key].data.push({
              path: url,
              title: componentDescripe,
              createUser: componentCreater,
              createDate: componentDate,
            })
          }
        }
      }
    } else {
      // 当前为文件夹，则递归调用自身
      fsReaddir(url)
    }
  })
};

fsReaddir('./src');

// 写出来的文件可在https://www.json.cn/转化为json数据
setTimeout(() => {
  fs.writeFileSync('./node-analysis.js', JSON.stringify(conponentData))
}, 1000)