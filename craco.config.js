const CracoLessPlugin = require('craco-less');
const {
   getThemeVariables
} = require('antd/dist/theme');

// default ant themes (dark / compact)
const theme = getThemeVariables({
   dark: false
});

module.exports = {
   plugins: [{
      plugin: CracoLessPlugin,
      options: {
         lessLoaderOptions: {
            lessOptions: {
               modifyVars: {
                  ...theme,
                  // Full list of default variables for overides can be found at https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                  '@primary-color': '#434343'
               },
               javascriptEnabled: true,
            },
         },
      },
   }, ],
};