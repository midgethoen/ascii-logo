#!/usr/bin/env conductance 

/*
 *  __  __               _                                 _   _ 
 * |  \/  |   ___     __| |   ___   _ __   _ __           | | | |
 * | |\/| |  / _ \   / _` |  / _ \ | '__| | '_ \   _____  | |_| |
 * | |  | | | (_) | | (_| | |  __/ | |    | | | | |_____| |  _  |
 * |_|  |_|  \___/   \__,_|  \___| |_|    |_| |_|         |_| |_|
 *
 */
@ = require([
  'mho:std',
  {id:'sjs:nodejs/terminal', name:'terminal'},
  {id:'./ascii.sjs', name:'ascii'},
])

@terminal.clear()

function colorFunc(elem){
  if (elem.x < 46) elem.color = 'black'
  else if (elem.x < 55) elem.color = 'grey'
  else elem.color = 'red'
  return elem
}

@terminal.write('\x1b[?25l')

@fs.readFile('ascii-logo').toString()
.. @ascii.charstream
.. @ascii.shuffle
.. @transform(colorFunc)
.. @ascii.center
.. @ascii.trottle(5)
.. @ascii.rotate(3)
.. @ascii.write

size = process.stdout.getWindowSize()
@terminal.write('\x1b['+process.stdout.rows+';0H')
@terminal.reset()
