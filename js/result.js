// MIT licence (see licence.txt). D Czech 2020.
// Results page

function sessionStats(){
  window.location.href = "session.html";
}

function back(){
  window.location.href = "index.html";
}

function showValue(term){
  termVal = JSON.parse(localStorage.getItem(term + "Val"));
  termShow = document.getElementById(term + "Result");
  termShow.innerHTML = termVal;
}

function showLikelihood(term, minVal, maxVal){
  termVal = JSON.parse(localStorage.getItem(term + "Val"));
  termLikelihood = document.getElementById(term + "Likelihood");
  termLikelihood.innerHTML = checkLikelihood(Number(termVal), minVal, maxVal);
}

function setFontColour(str, color) {
    return '<span style="color: ' + color + '">' + str + '</span>';
}

function checkLikelihood(userVal, min, max){
  var output = setFontColour("within the region of", "#6BCAFA"); //#6AD1E3
  if(userVal < min){
    output = setFontColour("less than", "#F76248"); //#F44934
  }
  else if(userVal > max){
    output = setFontColour("greater than", "#A3E879"); //#4AF02B
  } 
  return output;
}

function initSession(){
  // Run this on page load
  N = JSON.parse(localStorage.getItem("N"));
  NShow = document.getElementById("NCivs");
  NShow.innerHTML = N;
  
  allTerms = JSON.parse(localStorage.getItem("allTerms"));
  allTerms.forEach(showValue);
  
  var min = [1.5, 0.8, 0.19, 0.1, 0.1, 0.1, 304];
  var max = [3,   1,   3, 0.9, 0.9, 0.9, 1000000];
  
  var i = 0;
  for(i = 0; i < allTerms.length; i++){
    showLikelihood(allTerms[i], min[i], max[i]);
  }
}
