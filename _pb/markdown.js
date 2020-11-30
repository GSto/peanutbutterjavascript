import highlight from 'highlight.js'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if(lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
        highlight.highlight(lang, str, true).value +
        '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

export function renderMarkdown(content) {
  return md.render(content)
}