;(() => {
  // shortcuts to reduce minified size
  let doc = document
  let store = localStorage
  let t = 'template'

  window.scanTemplates = (root = doc.body, binds = {}) =>
    root.querySelectorAll(`[data-${t}]`).forEach(async host => {
      let name = host.dataset.template
      let template
      if (name.endsWith('.html')) {
        template = await loadTemplate(name)
      } else {
        template = doc.querySelector(`${t}[data-name="${name}"]`)
        if (!template) {
          console.error(t, `not found:`, name)
          return
        }
      }
      let values = binds[host.dataset.bind]
      host.textContent = ''
      if (Array.isArray(values)) {
        values.forEach(values => bindTemplate(host, template, values))
      } else {
        bindTemplate(host, template, values)
      }
    })

  let loadTemplate = async name => {
    let html = store.getItem(name)
    let p = fetch(name).then(res => res.text())
    if (!html) {
      html = await p
    }
    p.then(html => store.setItem(name, html))
    let template = doc.createElement(t)
    // deepcode ignore DOMXSS: the template is authored by the application developer, not from untrusted users
    template.innerHTML = html
    return template
  }

  let bindTemplate = (host, template, values) => {
    let node = template.content.cloneNode(true)
    let container = doc.createElement('div')
    container.appendChild(node)
    for (let key in values) {
      let value = values[key]
      for (let attr of [
        'class',
        'text',
        'disabled',
        'hidden',
        'value',
        'onclick',
      ]) {
        container
          .querySelectorAll(`[data-${attr}="${key}"]`)
          .forEach(element =>
            attr == 'class'
              ? element.classList.add(value == true ? key : value)
              : (element[attr == 'text' ? 'textContent' : attr] = value),
          )
      }
    }
    while (container.childNodes.length) {
      host.appendChild(container.childNodes.item(0))
    }
  }
})()
