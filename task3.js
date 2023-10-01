const fs = require('fs');

// Load the JSON file
const jsonData = fs.readFileSync('output.json', 'utf8');
const data = JSON.parse(jsonData);

const n = data.length;

for (let i = 0; i < n; i++) {
    let val = data[i]['Timecard Hours (as Time)'].toString();
    
    if(val.substring(0, 2) > 14){
        const str = data[i]['Position ID'] + " " + data[i]['Employee Name'] + " " + data[i]['File Number'];
        fs.appendFile("outputTask3.txt", str, (err) => {
            if (err) {
              console.log(err);
            }
        });
    }
    else if(val.substring(0, 2) === 14){
        if(val.substring(3, 5) > 0){
            const str = data[i]['Position ID'] + " " + data[i]['Employee Name'] + " " + data[i]['File Number'];
            fs.appendFile("outputTask3.txt", str, (err) => {
                if (err) {
                console.log(err);
                }
            });
        }
    }
}