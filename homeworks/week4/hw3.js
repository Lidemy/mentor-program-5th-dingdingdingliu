const request = require('request')
const process = require('process')

const BASE_URL = 'https://restcountries.eu/rest/v2/name/'
const countryName = process.argv[2]

request.get(
  `${BASE_URL}${countryName}`,
  (err, res, body) => {
    if (err) {
      console.log('找不到國家資訊')
      return
    }

    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      return console.log('ERROR!', err)
    }

    for (let i = 0; i < data.length; i++) {
      const result = `
        ============
        國家 : ${data[i].name}
        首都 : ${data[i].capital}
        貨幣 : ${data[i].currencies[0].code}
        國碼 : ${data[i].callingCodes[0]}
      `
      console.log(result)
    }
  }
)
