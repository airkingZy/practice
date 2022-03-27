const CracoLessPlugin = require('craco-less');
module.exports = {
    // style: {
    //     postcss: {
    //         plugins: [require('tailwindcss'), require('autoprefixer')],
    //     },
    // },
    babel: {
        //支持装饰器
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    //   libraryDirectory: "es",
                    style: true, //设置为true即是less 这里用的是css
                },
            ],
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {},
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
