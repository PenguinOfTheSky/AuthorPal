TS.js.highlight = function(str, language) {
  if (language == 'js' || language =='javascript') {
    return `<pre><code>${hljs.highlightAuto(str).value}</code></pre>`;
  } else if (language == 'css') {
    return `<pre><code>${hljs.highlightAuto(str).value}</code></pre>`;
  } else if (language == 'json') {
    return `<pre><code>${hljs.highlightAuto(str).value}</code></pre>`;
  } else if (language == 'rich text') {
    return str
  } else if (language == 'html') {
    return `<pre><code>${hljs.highlightAuto(str).value}</code></pre>`
  } else if (language == 'markdown') {
    return marked(str)
  }
  
}
