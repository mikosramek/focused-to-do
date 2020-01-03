// const remote = require('electron').remote;
const fs = window.require('fs');
const path = require('path');
// const app = remote.require('app');

const filePath = path.join(require('os').homedir() + '/.ftd/');
const fileName = 'data.txt';
// const filePath = './data.txt';

export function write(data) {
  let toWrite = '';
  data.forEach((object, index) => {
    toWrite += object.task + ',' + object.priority + ',' +object.complete;
    if(index < data.length - 1){
      toWrite += '\n';
    }
  })
  if(data.length < 0){
    toWrite = null;
  }
  fs.writeFile(filePath + fileName, toWrite, (err) => {
    if (err) {
      console.log(`Can't write to ${filePath}`)
      throw err
    };
    // console.log('The file has been saved!');
  });
}

export function read(callback) {
  fs.readFile(
    filePath + fileName,
    'utf-8',
    (err, data) => {
      if( err ) {
        fs.mkdir(filePath, {}, (err) => { 
          if(err){
            write();
            throw err; 
          }
        });
        throw err;
      };
      const values = data.toString().split('\n');
      const listItems = values
        .filter((task) => {
          return task !== ''
        })
        .map((task) => {
          const splitTask = task.toString().split(',');
          return { task: splitTask[0], priority: splitTask[1], complete: splitTask[2] === 'true' }
        });
      return callback(listItems);
    }
  )
}