// MIT licence (see licence.txt). D Czech 2020.
// Index

LOG_MAX = 10e6 // Max log value for log scale

function initSession(){
  // Initialise the page
  var allTerms = ["Rstar", "Fp", "Ne", "Fl", "Fi", "Fc", "L"];
  localStorage.setItem("allTerms", JSON.stringify(allTerms));
  var i;
  for(i = 0; i < allTerms.length; i++){
    updateEqn(allTerms[i], allTerms);
    // Add listeners for slider info
    hoverInfo(allTerms[i]);
  }
  // Value of N
  if(localStorage.getItem("NSessionVals") === null){
    var NArr = ["N"];
    localStorage.setItem("NSessionVals", JSON.stringify(NArr));
  }
  // On hover for N
  hoverInfo("N")
  // Value of each term
  var i;
  for(i = 0; i <allTerms.length; i++){
    termArrName = allTerms[i] + "SessionVals";
    if(localStorage.getItem(termArrName) === null){
      var termArr = [allTerms[i]];
      localStorage.setItem(allTerms[i] + "SessionVals", JSON.stringify(termArr));
    }
  }
  // Time
  if(localStorage.getItem("timeSessionVals") === null){
    timeArr = ["time"];
    localStorage.setItem("timeSessionVals", JSON.stringify(timeArr));
  }
}

function updateEqn(term, allTerms){
  // Update and display the equation values
  // Calculate and display N
  var slider = document.getElementById(term + "In");
  var output = document.getElementById(term + "Val");
  output.innerHTML = slider.value;
  if(term == "L"){
    var LOutput = logScale(Number(slider.value), 1, LOG_MAX);
    output.innerText = Math.round(LOutput); 
  }
  else{
    output.innerText = slider.value;
  }
  calculateN(allTerms);
  slider.oninput = function(){
    if(term == "L"){
        // output.innerText = Number(this.value).toExponential(2);
        var LOutput = logScale(Number(this.value), 1, LOG_MAX);
        output.innerText = Math.round(LOutput);
    }
    else{
      output.innerText = this.value;
    }
    calculateN(allTerms);
  }
}

function logScale(inputVal, lowVal, highVal){
  // Outputs a log scale from lowVal to highVal
  // for a linear input.
  // lowVal and highVal may not be 0.
  // Assuming 0 <= inputVal <= 100.
  var lowScale = Math.log(lowVal);
  var highScale = Math.log(highVal);
  var scaleRange = (highScale - lowScale)/100.0 
  return Math.exp(inputVal*scaleRange)
}

function calculateN(allTerms){
  // Calculate the value of N for current term values.
  var N = 1;
  var i;
  for (i = 0; i < allTerms.length; i++){
    termVal = document.getElementById(allTerms[i] + "In").value;
    if(allTerms[i] === "L"){
      N = N * logScale(termVal, 1, LOG_MAX);
    }
    else{
      N = N * termVal;
    }
  }
  N = Math.round(N);
  localStorage.setItem("N", JSON.stringify(N));
  // N = N.toExponential(3);
  output = document.getElementById("NVal");
  output.innerHTML = N;
}

function saveTermVals(term, val){
  // Write term values to local storage.
  termArr = JSON.parse(localStorage.getItem(term + "SessionVals"));
  termArr[termArr.length] = val;
  localStorage.setItem(term + "SessionVals", JSON.stringify(termArr));
}

function submitTerms(){
  // Save current status of the equation
  // Link to results page
  var allTerms = ["Rstar", "Fp", "Ne", "Fl", "Fi", "Fc", "L"];
  // Save N
  N = JSON.parse(localStorage.getItem("N"));
  saveTermVals("N", N);
  // Save all term values
  var i;
  for (i = 0; i < allTerms.length; i++){
    termVal = Number(document.getElementById(allTerms[i] + "In").value);
    if(allTerms[i] === "L"){
      termVal = Math.round(logScale(termVal, 1, LOG_MAX));
    }    
    localStorage.setItem(allTerms[i] + "Val", JSON.stringify(termVal));
    saveTermVals(allTerms[i], termVal);
  }
  // Save current time
  time = getNow();
  saveTermVals("time", time);
  window.location.href = "result.html";
}

function pad(n){
  // Pad for formatting purposes
  return n<10 ? '0'+n : n;
}

function getNow(){
  // Get the current date and time
  var now = new Date();
  yyyy = now.getFullYear();
  mm = pad(now.getMonth() + 1);
  dd = pad(now.getDate());
  hr = pad(now.getHours());
  min = pad(now.getMinutes());
  sec = pad(now.getSeconds());
  var time = yyyy + '-' + mm +'-' + dd + ' ' + hr + ':' + min + ':' + sec;
  return time;
}

function disp(action, element){
  // Return a function for closure
  return function(){
    element.style.visibility = action;
  }
}

function hoverInfo(term){
  // Add listeners to each term/slider element
  termElement = document.getElementById(term);
  termDisplay = document.getElementById(term + "Info");
  termElement.addEventListener("mouseover", disp('visible', termDisplay));
  termElement.addEventListener("mouseout", disp('hidden', termDisplay));
}

function sessionStats(){
  // Link to session statistics
  window.location.href = "session.html";
}

function ilbeHome(){
  // Link to ILBE homepage (IAC 2019)
  window.location.href = "https://www.ilbe2019.com/activities";
}