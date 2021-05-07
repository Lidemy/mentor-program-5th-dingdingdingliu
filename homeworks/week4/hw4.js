const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': '0hgqljegw8tgmnycmpjqtwep02w0c1',
    Accept: 'application / vnd.twitchtv.v5 + json'
  }
}

request.get(
  options,
  (err, res, body) => {
    if (err) {
      console.log('ERROR!')
      return
    }

    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      return console.log('ERROR!', err)
    }

    const games = data.top

    games.forEach((game) => {
      const result = `${game.viewers} ${game.game.name}`
      console.log(result)
    })
  }
)
