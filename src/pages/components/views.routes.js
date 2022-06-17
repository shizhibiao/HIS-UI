import React from 'react';
import Loadable from 'react-loadable';
const modulesFiles = require.context('../components', true, /index\.js/);

const routes = modulesFiles.keys().reduce((routes, modulePath) => {
    const primaryPath = modulePath.split('/')[1];
    const split = primaryPath.includes('-') ? primaryPath.split('-') : [primaryPath];
    let moduleName = split[0][0].toUpperCase() + split[0].slice(1);
    if (split.length > 1) {
        for (let i = 1; i < split.length; i++) {
            moduleName += split[i][0].toUpperCase() + split[i].slice(1);
        }
    }
    let value = modulesFiles(modulePath);
    if (value[moduleName] && 'title' in value[moduleName] && value[moduleName].title) {
        value = value[moduleName]
    }
    
    for (var key in value) {
        let isObj = value[key] && Object.prototype.toString.call(value[key]) === '[object Object]' ? true : false;
        let currentObj = isObj ? value[key] : value;
        let component = isObj ? value[key].component : value[moduleName];
        let path = isObj ? value[key].path : primaryPath
        const modules = {
            ...currentObj,
            name: isObj ? '' : moduleName,
            path: `/components/${path}`,
            component: component ? Loadable({
                loader: component,
                loading() {
                    return <div>加载中……</div>
                }
            }) : null
        };
        routes.push(modules);
    }
    return routes;
}, []);

export default routes;