const displayNum = (num) => {
  if (num < 10) {
    return '0' + num
  }
  else
    return '' + num
}

export {
  displayNum
}