const path = require('path');

function rateExpectancy() { 
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '..', 'data', 'Indicators.csv'))
});
var counter = 0;
var json = [];
var headerExpectancy = ["Year","Birth","Death"];
var outputPath = path.resolve(__dirname, '..', 'output', 'rate.json');



rl.on('line', (line) => {
        if (counter == 0) {
            headers = line.split(",");
            counter++;
        }
        if (counter > 0) {
            tmp = {}
            cell = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            lifeRate(cell);            
        };
    })
    .on('close', () => {

    	for (var i = 0; i < year.length; i++) { 
    		temp = {};
			temp[headerExpectancy[0]] = year[i];
			temp[headerExpectancy[1]] = birth[i];
			temp[headerExpectancy[2]] = death[i];
            json.push(temp);
        }        
        fs.writeFile(outputPath, JSON.stringify(json), function() {
            console.log("Json file successfully created for ", year.length ," lines.");
        });
    });
}


// Declare year, Birth and Death Array
var year = [];
var birth = []
var death = [];


// Filter rows with asian countries, Year birth 1960 and 2015 and Male and Female
function lifeRate(cell) {
    if (cell[0] == "India") {
        var curentYear = cell[4];
        var crudeRate = cell[2];        

    	if (year.includes(curentYear)){
    		getRateValue(curentYear);
    	} else {
    		year.push(curentYear);
    		getRateValue(curentYear);
    	}
    }
}

// Check Birth and Death Rate values 
function getRateValue(curentYear){
	if (cell[2] == '"Birth rate, crude (per 1,000 people)"'){
		birth[year.indexOf(curentYear)] = parseFloat(cell[5]);    
	} else if (cell[2] == '"Death rate, crude (per 1,000 people)"') {
	   death[year.indexOf(curentYear)] = parseFloat(cell[5]);	
	}
}
module.exports = rateExpectancy;