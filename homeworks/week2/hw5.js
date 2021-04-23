function join(arr, concatStr) {
  var length = arr.length
  var str = ""
  for (let i=0; i<(length-1); i++) {
    str += arr[i] + concatStr
  }
  return str + arr[length-1]
}

function repeat(str, times) {
  var result = ""
  for (let i=0; i<times; i++) {
    result += str
  }
  return result
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
