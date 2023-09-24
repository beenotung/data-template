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
    typeof options == 'function'
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
    let apply = (attr, f) => {
      container.querySelectorAll(`[data-${attr}]`).forEach(e => {
        let key = e.dataset[attr],
        value = values[key],
        t = e.tagName == 'TEMPLATE',
        last = e
        if (t && value && attr == 'show') value = [1]
        if (!Array.isArray(value)) return f(e, value, key)
        value.forEach(value => {
          let node = (t ? e.content : e).cloneNode(true)
          f(node, value, key)
          value && typeof value == 'object' && renderData(node, value)
          if (!t)
            return last.insertAdjacentElement('afterend', node), last = node
          for (let child of node.childNodes)
            child.nodeType == Node.TEXT_NODE
              ? last.insertAdjacentText('afterend', child.textContent)
              : (last.insertAdjacentElement('afterend', child), last = child)
        })
        e.remove()
      })
    }
    apply('text', (e, v) => e.textContent = v)
    apply('class', (e, v, k) => v == true ? e.classList.add(k) : v && e.classList.add(...v.split(' ')))
    apply('show', (e, v) => e.hidden = !v)
    apply('readonly', (e, v) => e.readOnly = !!v)
    for (let attr of ['open', 'checked', 'disabled', 'selected', 'hidden'])
      apply(attr, (e, v) => e[attr] = !!v)
    for (let attr of [
      'id',
      'title',
      'href',
      'src',
      'alt',
      'value',
      'action',
      'onsubmit',
      'onclick',
    ])
      apply(attr, (e, v) => v && (e[attr] = v))
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
    let e
    for (let k in o) (e = form[k]) && (e.value = o[k])
  }

  w.d2 = x => x < 10 ? '0' + x : x

  w.toInputDate = date => {
    let d = new Date(date)
    return d.getFullYear() + '-' + d2(d.getMonth() + 1) + '-' + d2(d.getDate())
  }

  w.toInputTime = date => {
    let d = new Date(date)
    return d2(d.getHours()) + ':' + d2(d.getMinutes())
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
    let body = new URLSearchParams(new FormData(form))
    let { method, action } = form
    return method == 'get'
      ? fetch(action + '?' + body)
      : fetch(action, {
          method,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
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
  w.del = url => fetch(url, { method:'DELETE' })
})(window)
