var initBoxes = function( $container ) {
  var html = '';
  var i;
  for (i = 0; i < 40; i++) {
    for (j = 0; j < 40; j++) {
      var id = 'x'+i+'y'+j;
      html += '<div id="'+id+'" class="box"></div>';
    }
  }
  $container.html( html );
};

var getBoxState = function( x, y ) {
  var id = '#x'+x+'y'+y;
  if ( $( id ).length > 0 ) {
    if ( $( id ).css('background-color') === 'rgb(255, 255, 255)') {
      return 0;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
};

var setBoxState = function( x, y, state ) {
  var id = '#x'+x+'y'+y;
  if (state === 0) {
    $( id ).css('background-color', 'white');
  } else {
    $( id ).css('background-color', 'black');
  }
};

var getAdjacentLive = function( x, y ) {
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

var step = function() {
  var i,j;
  var nextStates = new Array(40);
  for (var row = 0; row < 40; row++) {
    nextStates[row] = new Array(40);
  }

  // Based on a non-changing snapshot of the board, determine all next states.
  for (i = 0; i < 40; i++) {
    for (j = 0; j < 40; j++) {
      if (getBoxState( i,j ) === 0) {
        if (getAdjacentLive( i,j ) === 3) {
          nextStates[i][j] = 1;
        } else {
          nextStates[i][j] = 0;
        }
      } else {
        if (getAdjacentLive( i,j ) < 2 || getAdjacentLive( i,j ) > 3) {
          nextStates[i][j] = 0;
        } else {
          nextStates[i][j] = 1;
        }
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

/* 
  we must solve the problem that results from updating our boxes in the middle
  of an evaluation step. need to cache results, then implement them at the end.

var step = function() {
  var i,j;
  var nextStates = [][];
  for (i = 0; i < 40; i++) {
    for (j = 0; j < 40; j++) {
      if (getBoxState( i,j ) === 0) {
        if (getAdjacentLive( i,j ) === 3) {
          setBoxState( i,j,1 );
        }
      } else {
        if (getAdjacentLive( i,j ) < 2 || getAdjacentLive( i,j ) > 3) {
          setBoxState( i,j,0 );
        }
      }
    }
  }
};
*/

$(document).ready( function () {
  initBoxes( $('#grid') );

  /*
  alert(getBoxState( 20, 20 ));
  alert(getAdjacentLive( 20, 20 ));
  */
  
  $( '.box' ).click( function () {
    /*alert($( this ).attr('id'))*/
    if ( $( this ).css('background-color') === 'rgb(255, 255, 255)') {
      $( this ).css('background-color', 'black');
    } else {
      $( this ).css('background-color', 'white');
    }
  });

  $( '#step' ).click( function() {
    step();
  });

});


