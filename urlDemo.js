import url from 'url'

const urlstring = 'https://www.google.com/search?q=hello+world'


// URL Object

const urlObj = new URL(urlstring)

console.log(urlObj.search)


//format()

console.log(url.format(urlObj))


//import.meta.url
console.log((import.meta.url))


//fileURLToPath()

console.log(url.fileURLToPathToPath(import.meta.url))

console.log(urlObj.search)