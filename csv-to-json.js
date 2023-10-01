// Reading the file using default
const fs = require("fs");
csv = fs.readFileSync("Assignment_Timecard.xlsx - Sheet1.csv");

//var csv is the CSV file with headers
function csvJSON(csv){

	var lines = csv.toString().split("\r");
  
	var result = [];
  
	var headers=lines[0].split(",");
	// console.log(headers)
  
	for(var i=1;i<lines.length;i++){
		var obj = {};
		var currentline=lines[i].split(",");
		// console.log(currentline)
  
		let k = 0;
		for(var j = 0; j < currentline.length; j++){
			if(j == 7){
				obj[headers[k]] = currentline[j] + "," + currentline[j + 1];
				j++;
			}
			else{
				obj[headers[k]] = currentline[j];
			}
			k++;
		}
  
		result.push(obj);
  
	}
  
	return result;
}

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(csvJSON(csv));
// console.log(json);
fs.writeFileSync('output.json', json);
