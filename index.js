#! /usr/bin/env node

'use strict'

var split = require('split2')
var pump = require('pump')
var through = require('through2')

var levels = {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal",
}

var logLevelTransformer = through.obj(function (chunk, enc, cb) {

  if (chunk.level) {
    chunk = Object.assign({},chunk,{
      level: levels[chunk.level] || chunk.level,
      message: chunk.msg
    })
    delete chunk['msg']
  }

  console.log(JSON.stringify(chunk))
  cb()
})

pump(process.stdin, split(JSON.parse), logLevelTransformer)
