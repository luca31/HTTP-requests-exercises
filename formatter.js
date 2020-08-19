function python(text){
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/#(.*)\n/g, "<span style='color:#2e7d32'>#$1<\/span>\n")
}

module.exports = {
  python
}