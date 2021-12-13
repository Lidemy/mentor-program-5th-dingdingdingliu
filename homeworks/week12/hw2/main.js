/* eslint-env jquery */

let title = ''
let uncompletedCount = 0
let insertId
let listId

$(document).ready(() => {
  const BASE_URL = 'https://mentor-program.co/mtr04group3/dingding/week12/hw2/'
  const todoContainer = $('.todo__container')
  const cardTitleDom = $('.card__title')
  const saveBtn = $('.btn-save')
  const updateBtn = $('.btn-update')
  const deleteBtn = $('.btn_delete_completed')
  const newTodoBtn = $('.btn-new')
  let dataSave = JSON.parse(localStorage.getItem('title'))
  if (dataSave) {
    dataSave.forEach(({ listTitle, id }) => {
      showTodoBtn(listTitle, id)
    })
  } else {
    dataSave = []
  }

  // 輸入Todolist標題
  $('.title__input').keypress((e) => {
    if (e.which === 13) {
      title = inputKeyIn($('input[name=todolist__title]'))
      $('.title__input').removeClass('d-flex').hide()
      cardTitleDom.text(title)
      $('input[name=todolist__title]').val('')
    }
  })

  // 輸入Todolist內容
  $('.items__input').keypress((e) => {
    if (e.which === 13) {
      addTodo(todoContainer, inputKeyIn($('input[name=todo_content]')))
      $('input[name=todo_content]').val('')
      uncompletedCount++
      updateUncompletedCount(uncompletedCount)
    }
  })

  // 事項完成切換
  todoContainer.on('click', '.fa-check-circle', (e) => {
    const targetItem = $(e.target).parent().parent()
    if ($('.todo_list', targetItem).hasClass('done')) {
      uncompletedCount++
    } else {
      uncompletedCount--
    }
    $('.todo_list', targetItem).toggleClass('done')
    $(e.target).toggleClass('doneicon')
    updateUncompletedCount(uncompletedCount)
  })

  // 刪除事項
  todoContainer.on('click', '.fa-trash-alt', (e) => {
    const targetItem = $(e.target).parent().parent()
    targetItem.remove()
    if (!$('.todo_list', targetItem).hasClass('done')) {
      uncompletedCount--
    }
    updateUncompletedCount(uncompletedCount)
  })

  // 顯示全部內容
  $('.btn_all').click(() => {
    const target = $('.todo_list').parent().parent()
    target.addClass('d-flex')
  })

  // 顯示切換內容是否完成
  $('.btn-container').click((e) => {
    const todoTarget = $('.todo_list').parent().parent()
    const doneTarget = $('.todo_list.done').parent().parent()
    if ($(e.target).hasClass('btn_active')) {
      todoTarget.addClass('d-flex').show()
      doneTarget.removeClass('d-flex').hide()
    } else if ($(e.target).hasClass('btn_completed')) {
      todoTarget.removeClass('d-flex').hide()
      doneTarget.addClass('d-flex').show()
    }
  })

  // 刪除已完成內容
  deleteBtn.click(() => {
    const doneTarget = $('.todo_list.done').parent().parent()
    doneTarget.remove()
  })

  // 修改事項內容
  todoContainer.on('click', '.fa-pen', (e) => {
    const input = $(e.target).parent().parent().find('input')
    const originTodo = $(e.target).parent().find('.todo_list')
    input.show()
    input.keypress((e) => {
      if (e.which === 13) {
        const newtodo = input.val().trim()
        if (!newtodo) {
          return
        }
        originTodo.text(escapeHtml(newtodo))
        input.hide()
      }
    })
  })

  // 新增Todolist
  newTodoBtn.click(() => {
    title = ''
    uncompletedCount = 0
    cardTitleDom.text('')
    $('.title__input').addClass('d-flex').show()
    todoContainer.empty()
    updateUncompletedCount(uncompletedCount)
    if (!saveBtn.hasClass('d-flex')) {
      saveBtn.addClass('d-flex').show()
    }
    updateBtn.removeClass('d-flex').hide()
  })

  // 儲存Todolist
  saveBtn.click(() => {
    if (!title) {
      alert('please input your TITLE')
      return
    }
    $.ajax({
      type: 'POST',
      url: `${BASE_URL}saveapi.php`,
      data: {
        title,
        todo: getTodoData()
      },
      async: false,
      success: (resp) => {
        insertId = resp.id
        return insertId
      },
      error: () => {
        alert('Fail!')
      }
    })

    dataSave.push({
      listTitle: title,
      id: insertId
    })
    const result = JSON.stringify(dataSave)
    localStorage.setItem('title', result)
    updateBtn.addClass('d-flex').show()
    saveBtn.removeClass('d-flex').hide()
    showTodoBtn(title, insertId)
  })

  // 儲存被修改的Todolist
  updateBtn.click(() => {
    const cardTitleDom = $('.card__title')
    title = cardTitleDom.text()
    listId = cardTitleDom.parent().find('input').val()
    $.ajax({
      type: 'POST',
      url: `${BASE_URL}updateapi.php?id=${listId}`,
      data: {
        title,
        todo: getTodoData()
      },
      success: (resp) => {
        console.log(resp)
      },
      error: () => {
        alert('Fail')
      }
    })
  })

  // 顯示已儲存的Todolist
  $('.side__bar').on('click', '.btn-list', (e) => {
    title = $(e.target).text()
    listId = $(e.target).parent().find('input').val()
    $.ajax({
      type: 'GET',
      url: `${BASE_URL}getapi.php?title=${title}&id=${listId}`,
      success: (resp) => {
        showSaveTodoList(todoContainer, resp.data)
      },
      error: () => {
        alert('!!')
      }
    })
    updateBtn.addClass('d-flex').show()
    saveBtn.removeClass('d-flex').hide()
  })
})

function getHTML(todo) {
  const html = `
        <li class="todo_list_item list-group-item d-flex flex-row justify-content-between">
  <div class="d-flex p-1">
    <div class="todo_list {todoclass}">${escapeHtml(todo)}</div>
    <i type="button" class="fas fa-pen fa-md p-1"></i>
  </div>
  <input class="edit_todo" style="display:none" type="text" name="todo" value="${escapeHtml(todo)}">
  <div class="todo__btn d-flex p-2">
    <i class="far fa-check-circle {checkclass} fa-md"></i>
    <i class="far fa-trash-alt fa-md px-2"></i>
  </div>
</li>
      `
  return html
}

function addTodo(container, todo) {
  container.append(getHTML(todo))
}

function showSaveTodoList(container, { title, listId, content }) {
  const cardTitleDom = $('.card__title')
  uncompletedCount = 0
  container.empty()
  cardTitleDom.text(title)
  cardTitleDom.parent().find('input').val(listId)
  const todos = JSON.parse(content)
  todos.forEach((todo) => {
    if (todo.is_done === 2) {
      uncompletedCount++
      container.append(
        getHTML(todo.content)
          .replace('{todoclass}', '')
          .replace('{checkclass}', ''))
    } else if (todo.is_done === 1) {
      container.append(
        getHTML(todo.content)
          .replace('{todoclass}', 'done')
          .replace('{checkclass}', 'doneicon'))
    }
  })
  if ($('.title__input').hasClass('d-flex')) {
    $('.title__input').removeClass('d-flex').hide()
  }
  updateUncompletedCount(uncompletedCount)
}

function getTodoData() {
  const todoItems = []
  $('.todo_list_item').each((i, element) => {
    const isDone = $(element).find('.todo_list').hasClass('done')
    const content = $(element).find('.todo_list').text()
    const completed = isDone ? 1 : 2
    todoItems.push({
      content,
      is_done: completed
    })
  })
  const data = JSON.stringify(todoItems)
  return data
}

function showTodoBtn(title, id) {
  const sideBar = $('.side__bar')
  const newBtn = `
      <div class='d-flex justify-content-center'>
          <button type="button" class="btn btn-outline-secondary btn-list m-2">${escapeHtml(title)}</button>
          <input type="hidden" value=${id}>
        </div>
      `
  sideBar.append(newBtn)
}

function inputKeyIn(inputTarget) {
  const value = inputTarget.val().trim()
  if (!value) {
    alert('Please input your field')
    inputTarget.val('')
    return
  }
  return value
}

function updateUncompletedCount(uncompletedCount) {
  let uncomplete = ''
  if (uncompletedCount > 1) {
    uncomplete = `${uncompletedCount} items uncompleted`
  } else {
    uncomplete = `${uncompletedCount} item uncompleted`
  }
  $('.uncomplete-count').text(uncomplete)
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
