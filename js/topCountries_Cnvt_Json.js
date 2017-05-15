const path = require('path');
function top_Countries() { 
    const readline = require('readline');
    const fs = require('fs');
    const rl = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, '..', 'data', 'Indicators.csv'))
    });
    var counter = 0;
    var json = [];
    var headerExpectancy = ["Country","Value"];
    var outputPath = path.resolve(__dirname, '..', 'output', 'topcountries.json');
    rl.on('line', (line) => {
            if (counter == 0) {
                headers = line.split(",");
                counter++;
            }
            if (counter > 0) {
                tmp = {}
                cell = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                LifeExpectancyCountries(cell);            
            };
        })
        .on('close', () => {
        	topcountries(country, lifeExpectancy);
        	for (var i = 0; i < topCountry.length; i++) { 
        		temp = {};
    			temp[headerExpectancy[0]] = topCountry[i];
    			temp[headerExpectancy[1]] = topLifeExpectancy[i];
                json.push(temp);
            }

            fs.writeFile(outputPath, JSON.stringify(json), function() {
                console.log("Json file successfully created for ", topLifeExpectancy.length ," lines.");
            });
        });
}

// Declare Country and Life Expectancy value Array
var country = [];
var lifeExpectancy = [];


// Filter rows with Life expectancy at birth, total (years)
function LifeExpectancyCountries(cell) {
    if ((cell[2] == '"Life expectancy at birth, total (years)"') && (cell[4] > 1960 && cell[4] < 2015) ){

        var currentCountry = cell[0];

        if (country.includes(currentCountry)){
    		lifeExpectancy[country.indexOf(currentCountry)] += parseFloat(cell[5]);
    	} else {
    		country.push(currentCountry);
        	lifeExpectancy[country.indexOf(currentCountry)] = parseFloat(cell[5]);
    	}
        
    }
}

// Declare Country and Life Expectancy value Array
var topCountry = [];
var topLifeExpectancy = [];
var dummy = [];
function topcountries(country, lifeExpectancy){
	var dummy = lifeExpectancy.slice();
	topLifeExpectancy = topValues(dummy);
	for (var i = 0; i < topLifeExpectancy.length; i++) {
		topCountry[i]=country[lifeExpectancy.indexOf(topLifeExpectancy[i])];
	}
}

var temp =[];
function topValues(value){	
	value.sort(function(a,b){return b - a;});
	for (var i = 0; i < 5; i++) {
		temp[i]=value[i];
	}
	return(temp);
}
module.exports = top_Countries;