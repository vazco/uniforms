Package.describe({
    name: 'documentation',
    version: '1.0.0'
});

Package.registerBuildPlugin({
    sources: ['builder.js'],
    name: 'Documentation',
    npmDependencies: {
        'markdown-it': '6.0.5',
        'markdown-it-anchor': '2.5.0',
        'markdown-it-highlightjs': '2.0.0'
    }
});

Package.onUse(function (api) {
    api.versionsFrom('1.3');

    api.use('isobuild:compiler-plugin@1.0.0');

    api.addFiles([
        'styles.markdown.css',
        'styles.highlight.css'
    ], 'client');
});

