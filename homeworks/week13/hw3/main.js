const title = document.querySelector('.navbar__title')
const navbar = document.querySelector('.navbar__list')
const contentGames = document.querySelector('.content__games')
const BaseURL = 'https://api.twitch.tv/kraken'
const requestHeader = new Headers()
requestHeader.append('Client-ID', '0hgqljegw8tgmnycmpjqtwep02w0c1')
requestHeader.append('Accept', 'application / vnd.twitchtv.v5 + json')
const requestInit = {
  method: 'GET',
  headers: requestHeader
}
let url

getFirstSite() // 顯示初始頁面

navbar.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gamename = e.target.innerText
    getGameSite(gamename, addItem)
  }
})

title.addEventListener('click', (e) => {
  navbar.innerHTML = ''
  getFirstSite()
})

async function getFirstSite() {
  url = `${BaseURL}/games/top?limit=5`
  const response = await fetch(url, requestInit)
  const jsonData = await response.json()
  try {
    const datas = await jsonData.top
    datas.forEach((data) => {
      const list = document.createElement('li')
      list.innerText = data.game.name
      navbar.appendChild(list)
    })
    getGameSite(datas[0].game.name, addItem)
  } catch (err) {
    console.log('err:', err)
  }
}

async function getGameSite(gamename, cb) {
  url = `${BaseURL}/streams?game=${gamename}&limit=20`
  const response = await fetch(url, requestInit)
  const jsonData = await response.json()
  try {
    const datas = await jsonData.streams
    document.querySelector('h3').innerText = gamename // 顯示遊戲名稱
    cb(datas) // 顯示遊戲頁面
  } catch (err) {
    console.log('err:', err)
  }
}

// 顯示遊戲實況
function addItem(datas) {
  let rawHTML = ''
  datas.forEach((data) => {
    rawHTML += `
        <div class='content__game'>
          <img class='game-img' src=${data.preview.medium}>     
          <div class='game-infos'>
            <img class='game-info-img' src=${data.channel.logo}>
            <div class='game-info'>
              <p class='game-title'>${data.channel.status}</p>
              <p class='game-channel'>${data.channel.name}</p>
            </div>
          </div>
        </div>
      `
  })
  rawHTML += `
      <div class="empty__game">
      </div>
      <div class="empty__game">
      </div>
    `
  contentGames.innerHTML = rawHTML
}
