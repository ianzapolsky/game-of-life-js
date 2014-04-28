var newlife = (function () {

  var 
    jqueryMap = {
      $container : null,
    },

    initBoxes, getBoxState, setBoxState, countAdjacentLive, step, executeSteps,
    init;

  initBoxes = function () {
    var html = '';
    for (var i = 0; i < 40; i++) {
      for (var j = 0; j < 40; j++) {
        var id = 'x'+i+'y'+j;
        html += '<div id="'+id+'" class="box"></div>';
      }
    }
    jqueryMap.$container.html( html );
  };

  getBoxState = function ( x , y ) {
    var id  = '#x'+x+'y'+y;
    var box = jqueryMap.$container.find( id );

    if ( box.length == 0 )
      return 0;
    else {
      if ( box.css('background-color') === 'rgb(255, 255, 255)')
        return 0;
      else
        return 1
    } 
  }; 

  setBoxState = function( x , y , state ) {
    var id  = '#x'+x+'y'+y;
    var box = jqueryMap.$container.find(id);

    if (state === 0)
      box.css('background-color', 'white');
    else
      box.css('background-color', 'black');
  };

  countAdjacentLive = function( x , y ) {
    var live = 0;
    live += getBoxState( x-1, y-1 );
    live += getBoxState( x-1, y );
    live += getBoxState( x-1, y+1 );
    live += getBoxState( x, y-1 );
    live += getBoxState( x, y+1 );
    live += getBoxState( x+1, y-1 );
    live += getBoxState( x+1, y );
    live += getBoxState( x+1, y+1 );
    return live;
  };

  step = function() {
    var i,j;
    var nextStates = new Array(40);
    for (var row = 0; row < 40; row++) {
      nextStates[row] = new Array(40);
    }

    // Based on a non-changing snapshot of the board, determine all next states.
    for (i = 0; i < 40; i++) {
      for (j = 0; j < 40; j++) {
        if (getBoxState( i,j ) === 0) {
          if (countAdjacentLive( i,j ) === 3)
            nextStates[i][j] = 1;
          else 
            nextStates[i][j] = 0;
        } else {
          if (countAdjacentLive( i,j ) < 2 || countAdjacentLive( i,j ) > 3)
            nextStates[i][j] = 0;
          else
            nextStates[i][j] = 1;
        }
      }
    }

    // Apply the states to the board, once all future states have already been
    // computed.
    for (i = 0; i < 40; i++) {
      for (j = 0; j < 40; j++) {
        setBoxState( i,j,nextStates[i][j] );
      }
    }
  };

  executeSteps = function() {
    var i;
    var target = $( '#input' ).val();
    if (isNaN(target) || target === '' || target%1 !== 0)
      alert("please enter an integer value.");
    else {
      step();
      for (i = 0; i < target-1; i++) {
        setTimeout(step, 1000);
      }
    }
  };

  init = function ( $container ) {

    jqueryMap.$container = $container;
    initBoxes();
  
    $( '.box' ).click( function (event) {
      event.preventDefault();
      if ( $( this ).css('background-color') === 'rgb(255, 255, 255)')
        $( this ).css('background-color', 'black');
      else
        $( this ).css('background-color', 'white');
    });

    $( '#step' ).click( function(event) {
      event.preventDefault();
      step();
    });
  };

  return { init : init };

}());

