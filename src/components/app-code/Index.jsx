/*
 * Creater:     shizi
 * CreateDate:  2022/05/10
 * Describe：   代码展示
 * */
import React from 'react';
import hlJS from 'highlight.js';
import 'highlight.js/styles/github.css';
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
          dangerouslySetInnerHTML={{ __html: hlJS.highlight(`${item}`, { language: 'jsx' }).value }}
        >
        </div>
      )
    })
  }

  return (
    <div className="code-page">
      <pre className="cp-pre">
        <code className="cp-pre-code">
          {'code' in props && props.code ? handleCodeProcessing(props?.code) : ''}
        </code>
      </pre>
    </div>
  )
};

export default CodePage;