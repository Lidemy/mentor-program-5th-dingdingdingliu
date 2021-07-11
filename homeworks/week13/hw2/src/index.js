import $ from 'jquery'
import { getCommentsAPI, addCommentsAPI } from './api'
import { addCommentToDom, getDate } from './utils'
import { getTemplate, cssTemplate } from './templates'

export function init(options) {
  let containerElement = null
  let styleElement = null
  let cursor = null
  let length = 0
  const { siteKey, apiURL } = options
  const formClassName = `${siteKey}-form_container`
  const textClassName = `${siteKey}-text_container`
  const btnClassName = `${siteKey}-get_more`
  const formSelector = `.${formClassName}`
  const textSelector = `.${textClassName}`
  const btnMoreSelector = `.${btnClassName}`
  containerElement = $(options.containerSelector)
  containerElement.append(getTemplate(formClassName, textClassName, btnClassName))
  styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)

  getCommentsAPI(apiURL, siteKey, cursor, (data) => {
    if (!data.result) {
      return alert(data.message)
    }
    showComments($(textSelector), data.messages)
  })

  $(btnMoreSelector).click(() => {
    getCommentsAPI(apiURL, siteKey, cursor, (data) => {
      if (!data.result) {
        return alert(data.message)
      }
      showComments($(textSelector), data.messages)
    })
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDom = $(`${formSelector} input[name=nickname]`)
    const contentDom = $(`${formSelector} textarea[name=content]`)
    const addCommentData = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val()
    }
    const appendDomData = {
      nickname: nicknameDom.val(),
      content: contentDom.val(),
      created_at: getDate(),
      id: null
    }
    addCommentsAPI(apiURL, addCommentData, (data) => {
      if (!data.result) {
        alert(data.message)
        return
      }
      alert(data.message)
      addCommentToDom($(textSelector), appendDomData, true)
      nicknameDom.val('')
      contentDom.val('')
    })
  })

  function showComments(container, messages) {
    const messagesLength = messages.length
    if (messagesLength <= 5) {
      messages.forEach((message) => {
        addCommentToDom(container, message)
      })
      $(btnMoreSelector).hide()
    } else {
      for (let i = 0; i < messagesLength - 1; i++) {
        addCommentToDom(container, messages[i])
      }
      $(btnMoreSelector).show()
      length = messages.length
      cursor = messages[length - 2].id
    }
  }
}
