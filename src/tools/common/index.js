/*
 * 注意：目前不支持export default
 *
 * 使用：React.$xxxx'
 */
let publicMethod = {};

const context = require.context('./', true, /\.js$/);

publicMethod = context.keys()
    .reduce((total, current) => {
        const module = context(current);
        total = {
            ...total,
            ...module
        };
        return total;
    }, publicMethod);

module.exports = publicMethod;
