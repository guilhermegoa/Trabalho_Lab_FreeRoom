const fs = require('fs-extra')
const path = require('path')

const build = path.join(__dirname, 'client', 'build/')
const public = path.join(__dirname, 'api', 'public/')

console.log('build', build)
console.log('public', public)

fs.moveSync(build, public, { overwrite: true }, (err) => {
  if (err) {
    throw new Error('Failed to move build folder into public.', err)
  }
})
