export const cssTemplate = `
* {
  box-sizing: border - box;
}
section { 
  display: flex; 
  flex-direction: column; 
}
.btn_more { 
  margin: 5px auto; 
}
`

export function getTemplate(formClassName, textClassName, btnClassName) {
  return ` 
  <section class="p-2 px-5">
    <form class="${formClassName} mb-5 px-5">
      <div class="mb-2">
        <label for="form-nickname" class="form-label">Nickname:</label>
        <input name="nickname" type="text" class="form-control" placeholder="Your nickname" id="form-nickname">
      </div>
      <div class="mb-2">
        <label for="form-content" class="form-label">Message: </label>
        <textarea name="content" class="form-control" id="form-content" rows="5" placeholder="Leave message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${textClassName} mb-4 px-5">
    </div>
    <div class="btn_more">
        <button type="button" class="btn btn-outline-secondary ${btnClassName}">MORE</button>
    </div>
  </section>`
}
