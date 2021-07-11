import $ from 'jquery'

export function getCommentsAPI(apiURL, siteKey, cursor, cb) {
  let url = `${apiURL}getmessage_api.php?site_key=${siteKey}`
  if (cursor) {
    url += `&cursor=${cursor}`
  }
  $.ajax({
    url
  }).done((data) => {
    cb(data)
  })
}

export function addCommentsAPI(apiURL, data, cb) {
  const url = `${apiURL}addmessage_api.php`
  $.ajax({
    type: 'POST',
    url,
    data
  }).done((data) => {
    cb(data)
  })
}
