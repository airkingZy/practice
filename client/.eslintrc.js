module.exports = {
    parser: '@typescript-eslint/parser', // 解析器
    extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'prettier'], // 继承的规则 [扩展]
    plugins: ['@typescript-eslint'], // 插件
    rules: {
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': 2,
    }, // 规则
};
