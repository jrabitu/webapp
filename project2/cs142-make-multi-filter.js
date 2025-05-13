"use strict";

function cs142MakeMultiFilter(originalArray){
  //original array gaa copydoh
  let currentArray=originalArray.slice();

  //butsaah utga ni funkts bna
  return function arrayFilterer(filterCriteria, callback){

    if(typeof filterCriteria==="function"){
      currentArray=currentArray.filter(filterCriteria);
    }else{
      return currentArray;
    }

    if(typeof callback==="function"){
      callback.call(originalArray, currentArray);
    }
    return arrayFilterer;
  };
}