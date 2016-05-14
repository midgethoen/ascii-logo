@ = require([
  'mho:std',
  {id:'sjs:nodejs/terminal', name:'terminal'},
])

exports.charstream = function(ascii){
  return @Stream(function(emit){
    //TODO: truely stream
    ascii = @join(ascii).split('\n')
    for (y in ascii){
      var line = ascii[y]
      for (x in line){
        emit({
          x: parseInt(x),
          y: parseInt(y),
          'char': line[x],
        })
      }
    }
  })
}

exports.shuffle = function(elements){
  return @Stream(function(emit){
    elements = @toArray(elements)
    while (elements.length){
      elements.splice( Math.floor(Math.random()*elements.length), 1)[0] .. emit
    }
  })
}

exports.trottle = function(stream, deltaT){
  return @Stream(function(emit){
    // true implementation
    stream .. @each{
      |elem|
      hold(deltaT)
      emit(elem)
    }
  })
}

exports.write = function(stream){
  stream .. @each{
    |elem|
    if (elem.color){
      @terminal.color(elem.color)
    } else {
      @terminal.reset()
    }
    @terminal
      .write('\x1b[' + elem.y + ';' + elem.x + 'H')
      .write(elem['char'])
  }
}

exports.center = function(stream){
  var x = 0,
      y = 0,
      size = process.stdout.getWindowSize(),
      screenX = size[0],
      screenY = size[1]

  var elems = stream..@toArray

  elems .. @each{
    |elem|
    if (elem.x > x){ x = elem.x }
    if (elem.y > y){ y = elem.y }
  }
  return elems.map(function(elem){
    elem.x = elem.x + Math.floor((screenX - x)/2)
    elem.y = elem.y + Math.floor((screenY - y)/2)
    return elem
  })
}

var ROTATION = '|/–\\';
exports.rotate = function(stream, speed){
  return @Stream(function(emit){
    stream .. @each.par{|elem|
      var i;
      if ((i = ROTATION.indexOf(elem['char'])) == -1){
        emit(elem)
      } else {
        var seq = ROTATION.slice(i+1).concat(ROTATION.slice(0,i+1)).split('')
        seq
          .. exports.trottle(speed)
          .. @transform(e->@extend(elem, {'char':e}))
          .. @each(emit)
      }
    }
  })
}
