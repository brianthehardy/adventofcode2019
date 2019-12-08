
var fs = require("fs");
var readline = require('readline');
rawText = fs.readFileSync( 'day8.txt' ).toString();

// Image is 25 pixels wide by 6 pixels tall
// 150 pixels per layer
let layers = [];

// Adds 150 characters to each layer
for( let jj = 0; jj < rawText.length; jj+=150 ){
 layers.push( rawText.slice(jj, jj+150) );
}

// Counts the number of 0's, 1's, and 2's in the layer
function countNumbers( layer ){
  let retVals = [0, 0, 0];
  for( let ii in layer ){
  retVals[ parseInt(layer[ii] ) ]++;
  }
  return retVals;
}

// Finds layer with least zeros
let minZeros = 151;
let minLayer;
for( let ii in layers ){

  let layerCount = countNumbers( layers[ii] );

  if( layerCount[0] < minZeros ){
    minZeros = layerCount[0];
    minLayer = layerCount;
  }

}

console.log( "Min Zeros: ", minZeros );
console.log( "Final Answer:", minLayer[1] * minLayer[2] );

// Part 2
// Find the showing layers
let finalLayer = [];
for( let ii = 0; ii < 150; ii++ ){
  finalLayer.push("2");
}


// Makes the photo
layers.forEach( function(x){
  for( let ii in x ){
    if( finalLayer[ii] == "2" ){
      finalLayer[ii] = x[ii];
    }
  }
});

let outputString = "";
for( let ii in finalLayer ){
  outputString += finalLayer[ii];
}

//Copy-pasted into Notepad++ for final viewing
console.log(outputString)


