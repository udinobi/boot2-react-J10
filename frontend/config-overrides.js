const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = {
    webpack: function(config, env) {
        const tsLoader = getLoader(
            config.module.rules,
            rule => rule.loader
              && typeof rule.loader === 'string'
              && rule.loader.includes('ts-loader')
        );

        tsLoader.options = {
            getCustomTransformers: () => ({
                before: [ tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: 'css',
                }) ]
            })
        };

        return config;
    },

    jest: function(config) {
        config.transformIgnorePatterns = [
          "/node_modules/(?!(ol)/).*/"
        ];

        return config;
    }
}
