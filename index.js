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
  if (typeof chunk === 'string') {
    console.log(chunk);
    cb();
    return;
  }

  if (chunk.level) {
    chunk = Object.assign({},chunk,{
      level: levels[chunk.level] || chunk.level,
      message: chunk.msg,
      timestamp: new Date(chunk.time)
    })

    delete chunk['msg']
    delete chunk['time']
  }

  console.log(chunk);
  cb()
})

/**
 * Parse as JSON if it is JSON, otherwise just return it.
 */
function tryParseJSON(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    if (e.name === 'SyntaxError') {
      return s;
    }
    throw e;
  }
}

pump(process.stdin, split(tryParseJSON), logLevelTransformer)
