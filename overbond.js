//Hard-coded bond values for challenge #1
var c1Bonds = [
	{name: 'C1', type: 'corporate', term: 10.3, yld: 5.30},
	{name: 'G1', type: 'government', term: 9.4, yld: 3.70},
	{name: 'G2', type: 'government', term: 12, yld: 4.8}
];

//Hard-coded bond values for challenge #2
var c2Bonds = [
	{name: 'C1', type: 'corporate', term: 10.3, yld: 5.30},
	{name: 'C2', type: 'corporate', term: 15.2, yld: 8.30},
	{name: 'G1', type: 'government', term: 9.4, yld: 3.7},
	{name: 'G2', type: 'government', term: 12, yld: 4.8},
	{name: 'G3', type: 'government', term: 16.3, yld: 5.50}
];

//Empty arrays that will hold arrays of corporate and government bonds respectively
var cBond = [];
var gBond = [];

//Function for challenge #1
//Accepts array of Bonds (currently set to take c1Bonds but this can be changed)
function calcYieldSpread(c1Bonds) {
	//reset arrays keeping track of government and corporate bonds
	cBond = [];
	gBond = [];
	//call separate function to divide array of bonds into separate corporate
	//and government bonds
	separateBonds(c1Bonds);
	console.log("Challenge #1:");
	for (var i = 0; i < cBond.length; i++) {
		//pass current corporate bond and list of government bonds to get\
		//government benchmark bond
		var bench = findBenchmark(cBond[i], gBond);
		//subtract benchmark yield from corporate bond yield to find spread
		var spread = Math.abs(cBond[i].yld - bench.yld).toFixed(2);
		console.log("Bond: " + cBond[i].name + " Benchmark: " + bench.name + " Spread to Benchmark: " + spread);
	}
}

//Function for challenge #2
//Accepts array of Bonds (currently set to take c2Bonds but this can be changed)
function calcSpread(c2Bonds) {
	//reset arrays keeping track of government and corporate bonds
	cBond = [];
	gBond = [];
	//call separate function to divide array of bonds into separate corporate
	//and government bonds
	separateBonds(c2Bonds);
	console.log("Challenge #2");
	for (var i=0; i < cBond.length; i++) {
		//pass current corporate bond and all government bonds for linear interpolation
		var temp = [] 
		//finds 2 closest bonds that are higher and lower in term respectively
		temp = findTwoClosest(cBond[i], gBond);
		//calculate spread
		var lower = temp[0].yld/temp[0].term;
		var higher = temp[1].yld/temp[1].term;
		var avg = (higher + lower) /2;
		var equalized = avg * cBond[i].term;
		var spread = cBond[i].yld - equalized;
		spread = spread.toFixed(2);
		console.log("Bond: " + cBond[i].name + " Spread to Curve: " + spread);
	}
}

//Accepts a corporate bond and a list of bonds
//Finds bond with closest term to corporate bond and returns it
function findBenchmark(cBond, bondList) {
	var curr = bondList[0];
	for (var i =0; i < bondList.length; i++) {
		//using abs value to find closest yield regardless of whether it goes over or under
		if (Math.abs(cBond.term - bondList[i].term) < Math.abs(cBond.term - curr.term)){
			curr = bondList[i];
		}
	}
	return curr;
}

//Takes a list of bonds, sorts into cBond or gBond based off 'type' value
function separateBonds(bonds) {
	//for all the bonds
	for (var i =0; i < bonds.length; i++) {
		//if it is corporate, add to cBond
		if (bonds[i].type === 'corporate') {
			cBond.push(bonds[i]);
		}else {
			gBond.push(bonds[i]);
		}
	}
}

//Accepts a bond and an array of bonds
//returns the closest bond with a lower term and the closest
//bond with a higher term than the submitted bond
function findTwoClosest(corpBond, gBond){
	var temp = new Array();
	var lower = gBond[0];
	var higher = gBond[0];
	var	curr = gBond[0];
	for (var i =0; i < gBond.length; i++){
		if(gBond[i].term < corpBond.term){
			if(gBond[i].term > curr.term){
				curr = gBond[i];
				lower = curr;
			}
		} else if (gBond[i].term > corpBond.term){
			if(corpBond.term > higher.term || gBond[i].term < curr.term){
				curr = gBond[i];
				higher = curr;
			}
		}
	}
	temp.push(lower);
	temp.push(higher);
	console.log(temp);
	return temp;
}

//Calling the 2 functions to complete the 2 challenges
calcYieldSpread(c1Bonds);
calcSpread(c2Bonds);