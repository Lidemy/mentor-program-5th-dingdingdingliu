/* eslint-env jquery */

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

function addCommentToDom(container, { id, nickname, content, created_at: createdAt }, isPrepend) {
  const html = `
        <div class="card text-center mb-3">
          <div class="card-header text-muted p-1">nickname: ${encodeHTML(nickname)}</div>
          <div class="card-body">
            <p class="card-text p-2">${encodeHTML(content)}</p>
          </div>
          <div class="card-footer text-muted p-1">
            ${encodeHTML(createdAt)}
          </div>
          <input type="hidden" value="${id}">
        </div>
      `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

function showComments(container, messages) {
  const messagesLength = messages.length
  messages.forEach((message) => {
    addCommentToDom(container, message)
  })
  if (messagesLength < 5) {
    $('.btn_more').hide()
  }
}

function getDate() {
  const months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ]
  const dateDatas = new Date()
  const year = dateDatas.getFullYear()
  const month = months[dateDatas.getMonth()]
  const date = dateDatas.getDate()
  const hour = dateDatas.getHours()
  const minute = dateDatas.getMinutes()
  const second = dateDatas.getSeconds()
  const datetime = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  return datetime
}

$(document).ready(() => {
  const BASE_URL = 'https://mentor-program.co/mtr04group3/dingding/week12/hw1/'
  const formSelector = '.form_container'
  let cursor = 0
  const siteKey = 'ding'
  let length
  const textContainer = $('.text_container')
  $.ajax({
    url: `${BASE_URL}getmessage_api.php?site_key=${siteKey}`
  }).done((data) => {
    if (!data.result) {
      return alert(data.message)
    }
    const { messages } = data
    showComments(textContainer, messages)
    length = messages.length
    cursor = messages[length - 1].id
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDom = $(`${formSelector} input[name=nickname]`)
    const contentDom = $(`${formSelector} textarea[name=content]`)
    const addCommentData = {
      site_key: 'ding',
      nickname: nicknameDom.val(),
      content: contentDom.val()
    }
    const appendDomData = {
      nickname: nicknameDom.val(),
      content: contentDom.val(),
      created_at: getDate(),
      id: null
    }
    $.ajax({
      type: 'POST',
      url: `${BASE_URL}addmessage_api.php`,
      data: addCommentData
    }).done((data) => {
      if (!data.result) {
        alert(data.message)
        return
      }
      alert(data.message)
      addCommentToDom(textContainer, appendDomData, true)
      nicknameDom.val('')
      contentDom.val('')
    })
  })

  $('.btn_get_more').click(() => {
    $.ajax({
      url: `${BASE_URL}getmessage_api.php?site_key=ding&cursor=${cursor}`
    }).done((data) => {
      if (!data.result) {
        return alert(data.message)
      }
      const { messages } = data
      showComments(textContainer, messages)
      length = messages.length
      if (length < 5) {
        return alert('沒有留言了')
      }
      cursor = messages[length - 1].id
    })
  })
})
