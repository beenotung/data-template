;(win => {
  /**
   * DOM related
   */

  // shortcuts to reduce minified size
  let t = 'template'

  let bindTemplate = (host, template, values) => {
    let node = template.content.cloneNode(true)
    let container = document.createElement('div')
    container.appendChild(node)
    for (let attr of [
      'class',
      'text',
      'disabled',
      'readonly',
      'open',
      'hidden',
      'show',
      'value',
      'checked',
      'href',
      'src',
      'alt',
      'title',
      'onclick',
    ]) {
      container.querySelectorAll(`[data-${attr}]`).forEach(element => {
        let key = element.dataset[attr]
        let value = values[key]
        attr == 'class'
          ? element.classList.add(value == true ? key : value)
          : attr == 'show'
          ? (element.hidden = !value)
          : attr == 'readonly'
          ? (element.readOnly = !!value)
          : attr == 'open' || attr == 'checked'
          ? (element[attr] = !!value)
          : (element[attr == 'text' ? 'textContent' : attr] = value)
      })
    }
    while (container.childNodes.length) {
      host.appendChild(container.childNodes.item(0))
    }
  }

  win.renderTemplate = async (host, binds = {}) => {
    let name = host.dataset.template
    let template
    if (name.endsWith('.html')) {
      template = document.createElement(t)
      // deepcode ignore DOMXSS: the template is authored by the application developer, not from untrusted users
      template.innerHTML = await getText(name)
    } else {
      template = document.querySelector(`${t}[data-name="${name}"]`)
      if (!template) return console.error(t, `not found:`, name)
    }
    let values = binds[host.dataset.bind]
    host.textContent = ''
    if (Array.isArray(values)) {
      values.forEach(values => bindTemplate(host, template, values))
    } else {
      bindTemplate(host, template, values)
    }
  }

  win.scanTemplates = (root = document.body, binds = {}) =>
    root
      .querySelectorAll(`[data-${t}]`)
      .forEach(host => renderTemplate(host, binds))

  /**
   * AJAX related
   */

  win.getText = async (url, options) => {
    let text = localStorage.getItem(url)
    let p = fetch(url, options).then(res => res.text())
    p.then(text => localStorage.setItem(url, text))
    let cache = options && options.cache
    let skipCache = cache && cache != 'force-cache'
    return skipCache ? p : text || p
  }

  win.getJSON = (url, options) => getText(url, options).then(JSON.parse)

  let toForm = (event_or_form = event) => {
    if (event_or_form instanceof HTMLFormElement) {
      return event_or_form
    }
    event_or_form.preventDefault()
    return event_or_form.target
  }

  win.submitForm = event_or_form => {
    let form = toForm(event_or_form)
    let params = new URLSearchParams()
    for (let input of form.elements) {
      if (input.type != 'checkbox' || input.checked) {
        params.append(input.name, input.value)
      }
    }
    return fetch(form.action, {
      method: form.method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
  }

  win.uploadForm = event_or_form => {
    let form = toForm(event_or_form)
    return fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
  }
})(window)
