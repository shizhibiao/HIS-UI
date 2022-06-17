import React from 'react';

// 这个asyncComponent函数接受一个importComponent的参数，importComponent调用时候将动态引入给定的组件。
// 在componentDidMount我们只是简单地调用importComponent函数，并将动态加载的组件保存在状态中。
// 最后，如果完成渲染，我们有条件地提供组件。如果不写null的话，也可提供一个loading，代表着组件正在渲染。

export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        constructor() {
            super();

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({component: component})
        }

        componentWillUnmount() {
            // 组件销毁前将静止让setState修改state的状态
            this.setState = (state,callback)=>{ return; }
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}