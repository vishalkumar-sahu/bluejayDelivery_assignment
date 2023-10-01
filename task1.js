const fs = require('fs');

// Load the JSON file
const jsonData = fs.readFileSync('output.json', 'utf8');
const data = JSON.parse(jsonData);

const n = data.length;

for (let i = 0; i < n; i++) {
    let emp_id = data[i]['Position ID'];

    let count = 1;
    let j = i+1;
    let max = 1;
    let prev = new Date(data[i]['Time'].substring(0, 11));

    while(j < n && data[j]['Position ID'] === emp_id){
        let next = new Date(prev);
        next.setDate(prev.getDate() + 1);
        // console.log(prev + " --- " + next);

        const curr = new Date(data[j]['Time'].substring(0, 11));

        if(curr.getDate() === prev.getDate()){
            // console.log("same ----> " + prev + " " + curr)
            j++;
            continue;
        }
        // console.log("next ----> " + prev + " " + curr)

        if(curr.getDate() !== next.getDate()){
            count = 0;
        }

        count++;
        max = Math.max(max, count);

        prev = curr;
        j++;
    }

    i = j-1;
    if(max >= 7){
        const str = data[i]['Position ID'] + " " + data[i]['Employee Name'] + " " + data[i]['File Number'];
        fs.appendFile("outputTask1.txt", str, (err) => {
            if (err) {
              console.log(err);
            }
        });
    }
}