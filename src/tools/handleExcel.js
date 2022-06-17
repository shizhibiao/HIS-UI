import * as XLSX from 'xlsx';
import { message } from 'antd';
/**
  exportExcel方法需要传入的参数
    1、headers --- 表头
    2、data --- 表格数据
    3、name --- 导出表格的名称，默认为导出表格数据
    4、arr --- 数组，每个单元格的大小，每个对象的key只必须是 wpx
    注意，导出表格的格式只能为xlsx，别的格式可能没数据或者不支持那种格式
 */

export const handleExcel = {
  // 导出 Excel
  exportExcel(headers, data, name = '导出表格数据', arr, format = 'xlsx') {
    let fileName = name + '.' + format;
    let headerData = []
    let headerDataLen = headers && headers.length > 0 ? headers.length : 0
    for (var i = 0; i < headerDataLen; i++) {
      headerData.push({ wpx: 100 })
    }
    // 单元格的大小
    let wpxArr = arr ? arr : headerData;
    const _headers = headers
      .map((item, i) => Object.assign({}, { dataIndex: item.dataIndex, title: item.title, position: i > 25 ? ('A' + String.fromCharCode(65 + i - 26) + 1) : String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { dataIndex: next.dataIndex, v: next.title } }), {});
    const _data = data
      .map((item, i) => headers.map((dataIndex, j) => Object.assign({}, { content: item[dataIndex.dataIndex], position: j > 25 ? ('A' + String.fromCharCode(65 + j - 26) + (i + 2)) : String.fromCharCode(65 + j) + (i + 2) })))
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
    // 合并 headers 和 data
    const output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围 ,["A1",..., "H2"]
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
    // 构建 workbook 对象
    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign(
          {},
          output,
          {
            '!ref': ref,
            '!cols': wpxArr,
          },
        ),
      },
    };

    XLSX.writeFile(wb, fileName, (err) => {
      if (err) {
        message.error(err)
      }
    });
    // return new Promise((resolve, reject) => {
    //   // 导出 Excel
    //   XLSX.writeFile(wb, fileName, (err) => {
    //     if (err) {
    //       reject(err)
    //     } else {
    //       resolve()
    //     }
    //   });
    // })
  }
};