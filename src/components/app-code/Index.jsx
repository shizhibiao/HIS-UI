/*
 * Creater:     shizi
 * CreateDate:  2022/05/10
 * Describe：   代码展示
 * */
import React from 'react';
import './style/index.less';

const CodePage = (props) => {
  // 代码处理
  const handleCodeProcessing = (code) => {
    return code && code.split('\n').map((item, index) => {
      return (
        <div
          key={index}
          className='cp-pre-code-row'
          style={{ height: item ? '32px' : '12px' }}
          dangerouslySetInnerHTML={{ __html: handleSpecialFieldReplacement(item) }}
        >
        </div>
      )
    })
  }

  const specialFieldArr = [{
    type: 'c-special-field', // , 'console.log', 'default', 'state', 'this.setState', 'var', 'const', 'let', 'return', '&cshhs', '&gzq'
    data: ['import', 'from', 'super', 'setTimeout', 'message.success', 'message.error', 'export'],
  }, {
    type: 'c-punctuation',
    data: ['&ksbq', '&jsbq', '&jsjsbq', '&ksHTMLzs', '&jsHTMLzs', '&ksxkh', '&jsxkh', '&kszkh', '&jszkh', '&ksdkh', '&jsdkh',
      ',', ';', '&dyh', '&syh', ':', '&kg', 'mountNode'
    ]
  }, {
    type: 'c-function',
    data: ['.map', '.render', 'render', 'ReactDOM']
  }, {
    type: 'c-string', // , 'dataIndex', 'title', 'typeCode', 'type', 'descripts', 'detailItem', 'id', 'descriptsSPCode', 'required', 'defaultValue', 'onClick', 'placeholder', 'key', 'className', 'style', 'size', 'position', 'align', 'width', 'icon'
    data: []
  }, {
    type: 'c-notes', // 注释内容
    data: ['&dhzs']
  }];

  // 将特殊字段替换成带样式的标签
  const handleSpecialFieldReplacement = str => {
    // 特殊字符替换
    // str = str.replace(/componentDidMount/g, '&cshhs');
    // str = str.replace(/constructor/g, '&gzq');
    str = str.replace(/\/\/ /g, '&dhzs');
    // str = str.replace(new RegExp('</'), '&jsksbq');
    str = str.replace(new RegExp('/>'), '&jsjsbq');
    str = str.replace(/\</g, '&ksbq');
    str = str.replace(/\>/g, '&jsbq');
    str = str.replace(/\(/g, '&ksxkh');
    str = str.replace(/\)/g, '&jsxkh');
    str = str.replace(/\[/g, '&kszkh');
    str = str.replace(/\]/g, '&jszkh');
    str = str.replace(/\{/g, '&ksdkh');
    str = str.replace(/\}/g, '&jsdkh');
    str = str.replace(/\'/g, '&dyh');
    str = str.replace(/\"/g, '&syh');
    str = str.replace(/ /g, '&kg');

    // 特殊字符枚举
    const outputEnum = {
      '&jsksbq': '</',
      '&jsjsbq': '/>',
      '&ksbq': '<',
      '&jsbq': '>',
      '&ksxkh': '(',
      '&jsxkh': ')',
      '&kszkh': '[',
      '&jszkh': ']',
      '&ksdkh': '{',
      '&jsdkh': '}',
      '&dyh': '\'',
      '&syh': '\"',
      '&dhzs': '\/\/ ',
      '&kg': ' ',
      '&gzq': 'constructor',
      '&cshhs': 'componentDidMount',
    }

    for (let i = 0; i < specialFieldArr.length; i++) {
      let type = specialFieldArr[i].type;
      for (let j = 0; j < specialFieldArr[i].data.length; j++) {
        let special = specialFieldArr[i].data[j];
        let notesText = ''; // 注释后面的内容
        if (type === 'c-notes' && str.indexOf('&dhzs') > -1) { // 注释操作
          notesText = str.split('&dhzs')[1];
          special = '&dhzs' + notesText;
        }
        let specialDom = `<span class=${type}>${type === 'c-notes' ? ('// ' + notesText) : (outputEnum[special] || special)}</span>`;
        if (str.indexOf(special) > -1 && !(str.indexOf(specialDom) > -1)) {
          let reg = new RegExp(special, 'g');
          str = str.replace(reg, specialDom);
        }
      }
    }

    return str;
  }

  return (
    <div className='code-page'>
      <pre className='cp-pre'>
        <code className='cp-pre-code'>
          {'code' in props && props.code ? handleCodeProcessing(props?.code) : ''}
        </code>
      </pre>
    </div>
  )
};

export default CodePage;