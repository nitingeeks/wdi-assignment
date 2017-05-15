const path = require('path');

function lifeExpectancy() { 

    const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '..', 'data', 'Indicators.csv'))
});
var counter = 0;
var json = [];
var headerExpectancy = ["Country","Male","Female"];
var outputPath = path.resolve(__dirname, '..', 'output', 'expectancy.json');

    rl.on('line', (line) => {
            if (counter == 0) {
                headers = line.split(",");
                counter++;
            }
            if (counter > 0) {
                tmp = {}
                cell = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

                lifeExpectancyValue(cell);            
            };
        })
        .on('close', () => {
        	for (var i = 0; i < country.length; i++) { 
        		temp = {};
    			temp[headerExpectancy[0]] = country[i];
    			temp[headerExpectancy[1]] = lifeExpectancyMaleValue[i];
    			temp[headerExpectancy[2]] = lifeExpectancyFemaleValue[i];
                json.push(temp);
            }        
            fs.writeFile(outputPath, JSON.stringify(json), function() {
                console.log("Json file successfully created for ", country.length ," lines.");
            });
        });
}



// Declare Country, Male and Female Array
var country = [];
var lifeExpectancyMaleValue = []
var lifeExpectancyFemaleValue = [];

// Asian Countries
var asiaCountry = ['AFG', 'ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'GEO', 'HKG', 'IND', 'IDN', 'IRN', 'IRQ', 'ZSR', 'JPN', 'JOR', 'KAZ', 'KWT', 'KGZ', 'LAO', 'LBN', 'MAC', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN', 'PAK', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN', 'TJK', 'THA', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'];

// Initialize array with zero 
var maleIndex	= new Array(asiaCountry.length).fill(0);
var femaleIndex = new Array(asiaCountry.length).fill(0);

// Filter rows with asian countries, Year birth 1960 and 2015 and Male and Female
function lifeExpectancyValue() {
    const cell = arguments[0];
    if ((asiaCountry.includes(cell[1])) && (cell[4] > 1960 && cell[4] < 2015) &&
        ((cell[2] == '"Life expectancy at birth, female (years)"') || (cell[2] == '"Life expectancy at birth, male (years)"'))
    ) {
        
        var curentCountry = cell[0];
    	var genderExpectancy = cell[2];

    	if (country.includes(curentCountry)){
    		getExpectancyValue(curentCountry);
    	} else {
    		country.push(curentCountry);
    		getExpectancyValue(curentCountry);
    	}
    }
}

// Check Expectancy value of male and female
function getExpectancyValue(curentCountry){
	if (cell[2] == '"Life expectancy at birth, male (years)"'){
		if (maleIndex[country.indexOf(curentCountry)] == 0){
			lifeExpectancyMaleValue[country.indexOf(curentCountry)] = parseFloat(cell[5]);
			maleIndex[country.indexOf(curentCountry)] =1;
		} else {
			lifeExpectancyMaleValue[country.indexOf(curentCountry)] += parseFloat(cell[5]);
		}
	} else if (cell[2] == '"Life expectancy at birth, female (years)"') {
		if (femaleIndex[country.indexOf(curentCountry)] == 0){
			lifeExpectancyFemaleValue[country.indexOf(curentCountry)] = parseFloat(cell[5]);
			femaleIndex[country.indexOf(curentCountry)] = 1;
		} else {
			lifeExpectancyFemaleValue[country.indexOf(curentCountry)] += parseFloat(cell[5]);
		}
	}
}

module.exports = lifeExpectancy;
