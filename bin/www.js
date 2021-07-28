#! /usr/bin/env node

const { program } = require('commander');

// console.log('a')
// program.option('-p --port', 'set server port')

// 配置信息
let options = {
    '-p --port <dir>': {
        "description": "init server port",
        "example": "serve-jin -p 3306"
    },
    '-d --directory <dir>': {
        "description": "init server diretory",
        "example": "serve-jin -d c:"
    }
}

function formatConfig (configs, cb) {
    Object.entries(configs).forEach(([key, val]) => {
        cb(key, val)
    })
}

formatConfig(options, (cmd, val) =>{
    program.option(cmd, val.description)
})

program.on('--help', () => {
    console.log('Examples: ');

    formatConfig(options, (cmd, val) => {
        console.log(val.example)
    })
})

program.name('serve-jin')

let version = require('../package.json').version
program.version(version)

program.parse(process.argv)
let cmdConfig = program.opts()

// console.log(cmdConfig)

let Server = require('../main.js')
new Server(cmdConfig).start()