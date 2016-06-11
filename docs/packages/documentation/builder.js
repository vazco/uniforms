var Markdown            = Npm.require('markdown-it');
var MarkdownAnchor      = Npm.require('markdown-it-anchor');
var MarkdownHighlightJS = Npm.require('markdown-it-highlightjs');

var markdown = new Markdown({html: true})
    .use(MarkdownAnchor)
    .use(MarkdownHighlightJS);

var markdownRender = function (name, text) {
    text = markdown
        .render(text)
        .replace(/'/g, '\\\'')
        .replace(/\n/g, '\\n');

    return 'exports.default = \'' + text + '\';';
};

function processFilesForTarget (files) {
    files.forEach(function (file) {
        var path = file.getPathInPackage();
        var name = path.replace('.md', '');

        file.addJavaScript({
            data: markdownRender(name, file.getContentsAsString()),
            path: path + '.js'
        });
    });
}

Plugin.registerCompiler({extensions: ['md']}, function () {
    return {
        processFilesForTarget: processFilesForTarget
    };
});
