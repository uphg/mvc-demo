export function createElement(string) {
  const template = document.createElement('template')
  template.innerHTML = string
  return template.content.children[0]
}

