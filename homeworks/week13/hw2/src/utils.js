export function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

export function addCommentToDom(container, comment, isPrepend) {
  const html = `
        <div class="card text-center mb-3">
          <div class="card-header text-muted p-1">nickname: ${encodeHTML(comment.nickname)}</div>
          <div class="card-body">
            <p class="card-text p-2">${encodeHTML(comment.content)}</p>
          </div>
          <div class="card-footer text-muted p-1">
            ${encodeHTML(comment.created_at)}
          </div>
          <input type="hidden" value="${comment.id}">
        </div>
      `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

export function getDate() {
  const monthObject = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ]
  const dayObject = new Date()
  const year = dayObject.getFullYear()
  const month = monthObject[dayObject.getMonth()]
  const date = dayObject.getDate()
  const hour = dayObject.getHours()
  const minute = dayObject.getMinutes()
  const second = dayObject.getSeconds()
  const datetime = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  return datetime
}
