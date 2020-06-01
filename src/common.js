import '@/styles/common.css'

const getMarkdown = function (mdData) {
  var markdown = window.markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>'
    }
  })
  return markdown.render(mdData)
}

const renderMarkdown = function (mdData) {
  document.getElementById('markdown').innerHTML = getMarkdown(mdData)
}

const runInnerJs = function (innerJs) {
  document.getElementById('runInnerJs').innerHTML = innerJs
}

const renderInnerJs = function (innerJs) {
  document.getElementById('renderInnerJs').innerHTML = getMarkdown(`
  # innerJs
  \`\`\`javascript
  ${innerJs}
  \`\`\`
  `)
}

export const init = function ({ markdown, innerJs }) {
  renderMarkdown(markdown)
  renderInnerJs(innerJs)
  runInnerJs(innerJs)
}
