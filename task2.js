const fs = require('fs');

// Load the JSON file
const jsonData = fs.readFileSync('output.json', 'utf8');
const data = JSON.parse(jsonData);

const n = data.length;

function diff_hours(dt2, dt1) {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

for (let i = 0; i < n; i++) {
    let emp_id = data[i]['Position ID'];

    let j = i+1;
    let bool = false;
    let prev = new Date(data[i]['Time']);

    while(j < n && data[j]['Position ID'] === emp_id){
        const curr = new Date(data[j]['Time']);

        if(curr.getDate() === prev.getDate()){
            let diff = diff_hours(prev, curr);
            if(diff > 1 && diff < 10){
                bool = true;
            }

            j++;
            continue;
        }

        prev = curr;
        j++;
    }

    i = j-1;
    if(bool === true){
        const str = data[i]['Position ID'] + " " + data[i]['Employee Name'] + " " + data[i]['File Number'];
        fs.appendFile("outputTask2.txt", str, (err) => {
            if (err) {
              console.log(err);
            }
        });
    }
}