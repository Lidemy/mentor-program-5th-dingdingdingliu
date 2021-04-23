function reverse(str) {
  var newArr = []
  var length = str.length
  for (let i = length; i >= 0; i--) {
    newArr.push(Array.from(str)[i])
  }
  console.log(newArr.join(""))
}

reverse('hello');
