// MIT licence (see licence.txt). D Czech 2020.
// Session

function init(){
  // Initialise the page on load
  //fillValues("time");
  fillValues("N");
  allTerms = JSON.parse(localStorage.getItem("allTerms"));
  allTerms.forEach(fillValues);
}

function result(){
  window.location.href = "result.html";
}

function back(){
  window.location.href = "index.html";
}

function fillTime(){
	timeVals = JSON.parse(localStorage.getItem("timeSessionVals"));
	toInsert = timeVals[1] + "<br>";
	var i;
	for(i = 2; i < termVals.length; i++){
	   	toInsert = toInsert + timeVals[i] + "<br>";
	}
	termOut = document.getElementById("timeValIn");
	termOut.innerHTML = toInsert;
}

function fillMedian(term, termVals){
    median = getMedian(termVals.slice(1));
    medianOut = document.getElementById(term + "MedianIn");
    medianOut.innerHTML = median;
}

function fillValues(term){
    termVals = JSON.parse(localStorage.getItem(term + "SessionVals"));
    if(termVals.length > 1){
      fillTime();
      fillMedian(term, termVals);
      toInsert = termVals[1] + "<br>";
      var i;
      for(i = 2; i < termVals.length; i++){
    	toInsert = toInsert + termVals[i] + "<br>";
      }
    termOut = document.getElementById(term + "ValIn");
    termOut.innerHTML = toInsert;
  }
}

function getMedian(termVals){
	var median;
	termVals.sort(sortNum);
	arrLen = termVals.length;
    if(arrLen % 2 == 0){
    	median = (termVals[arrLen / 2 - 1] + termVals[arrLen / 2])/2;
    }
    else{
    	median = termVals[(arrLen - 1) / 2]
    }
	return median;
}

function sortNum(x, y){
  return x - y;
}