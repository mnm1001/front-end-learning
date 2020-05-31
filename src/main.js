import '@/styles/main.css'

(function() {
  const path = require('path');

  const requireAllIndexJs = require.context('./demo/', true, /\index.js$/)
  const demos = requireAllIndexJs.keys().map(item => {
    const url = item.match(/^\.(.*)\/index\.js$/)[1]
    const tag = `
      <li>
        <a href="${url}">${url}</a>
      </li>
    `
    return tag
  })
  document.querySelector('#content').innerHTML = demos.join('')
}())
