;(w => {
  // shortcuts to reduce minified size
  let t = 'template'

  let bindTemplate = (host, template, values) => {
    let node = template.content.cloneNode(true)
    let container = document.createElement('div')
    container.appendChild(node)
    renderData(container, values)
    while (container.childNodes.length) {
      host.appendChild(container.childNodes.item(0))
    }
  }

  let parse = JSON.parse

  let useGet = use => (url, options, cb) =>
    typeof options === 'function'
      ? use(url, {}, options)
      : use(url, options, cb)

  let toForm = (event_or_form = event) =>
    event_or_form instanceof HTMLFormElement
      ? event_or_form
      : (event_or_form.preventDefault(), event_or_form.target)

  let fetchJSON = method => (url, body) =>
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

  w.renderData = (container, values) => {
    for (let attr of [
      'class',
      'id',
      'text',
      'disabled',
      'readonly',
      'open',
      'hidden',
      'show',
      'value',
      'checked',
      'selected',
      'href',
      'src',
      'alt',
      'title',
      'onclick',
    ]) {
      container.querySelectorAll(`[data-${attr}]`).forEach(element => {
        let key = element.dataset[attr]
        if (!(key in values)) return attr == 'show' && (element.hidden = true)
        let value = values[key]
        let apply = (element, value) => {
          attr == 'class'
            ? element.classList.add(value == true ? key : value)
            : attr == 'show'
            ? (element.hidden = !value)
            : attr == 'readonly'
            ? (element.readOnly = !!value)
            : attr == 'open' || attr == 'checked' || attr == 'selected'
            ? (element[attr] = !!value)
            : (element[attr == 'text' ? 'textContent' : attr] = value)
        }
        if (!Array.isArray(value)) return apply(element, value)
        let last = element
        value.forEach(value => {
          let node = element.cloneNode(true)
          apply(node, value)
          value && typeof value == 'object' && renderData(node, value)
          last.insertAdjacentElement('afterend', node)
          last = node
        })
        element.remove()
      })
    }
  }

  w.renderTemplate = async (host, binds = {}) => {
    let name = host.dataset.template
    let template
    if (name.endsWith('.html')) {
      template = document.createElement(t)
      getText(name, html => {
        // deepcode ignore DOMXSS: the template is authored by the application developer, not from untrusted users
        template.innerHTML = html
        next()
      })
    } else {
      template = document.querySelector(`${t}[data-name="${name}"]`)
      template ? next() : console.error(t, `not found:`, name)
    }
    function next() {
      let values = binds[host.dataset.bind]
      host.textContent = ''
      Array.isArray(values)
        ? values.forEach(values => bindTemplate(host, template, values))
        : bindTemplate(host, template, values)
    }
  }

  w.scanTemplates = (root = document.body, binds = {}) =>
    root
      .querySelectorAll(`[data-${t}]`)
      .forEach(host => renderTemplate(host, binds))

  w.fillForm = (form, o) => {
    for (let k in o) {
      let e = form[k]
      if (e) e.value = o[k]
    }
  }

  w.getText = useGet(async (url, options, cb) => {
    let text = localStorage.getItem(url)
    let p = fetch(url, options).then(res => res.text())
    let cache = options && options.cache
    let skipCache = cache && cache != 'force-cache'
    p.then(newText => {
      let diff = newText != text
      ;(skipCache || diff) && cb?.(newText)
      diff && localStorage.setItem(url, newText)
    })
    return !skipCache && text ? (cb?.(text), text) : p
  })

  w.getJSON = useGet((url, options, cb) =>
    getText(url, options, cb && (text => cb(parse(text)))).then(parse),
  )

  w.submitJSON = event_or_form => {
    let form = toForm(event_or_form)
    let body = {}
    for (let input of form.elements)
      if (input.name && (input.type != 'checkbox' || input.checked))
        body[input.name] = input.value
    return fetchJSON(form.method)(form.action, body)
  }

  w.submitForm = event_or_form => {
    let form = toForm(event_or_form)
    let params = new URLSearchParams()
    for (let input of form.elements)
      if (input.name && (input.type != 'checkbox' || input.checked))
        params.append(input.name, input.value)
    return fetch(form.action, {
      method: form.method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
  }

  w.uploadForm = event_or_form => {
    let form = toForm(event_or_form)
    return fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
  }

  w.postJSON = fetchJSON('POST')
  w.patchJSON = fetchJSON('PATCH')
  w.putJSON = fetchJSON('PUT')
})(window)
