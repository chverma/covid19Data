var path = require('path');
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'));

var directoryPath = path.join(__dirname, 'data');
var destPath = path.join(__dirname, 'data', 'all.json');

return fs.unlinkAsync(destPath)
.then(_ => {
  return fs.readdirAsync(directoryPath)
  .map((file) => {
      var fileDetails = file.split('.')[0];
      var day = fileDetails.substring(0,2);
      var month = fileDetails.substring(2,4);
      var year = fileDetails.substring(4,8);
      var strDate = `${year}-${month}-${day}`;
      var date = new Date(strDate);

      return fs.readFileAsync(path.join(__dirname, 'data', file))
      .then((res) => JSON.parse(res)
      ).reduce((accum, elem) => {
        if (elem['Departamento'] != null){
          accum.push({'dataset': elem['Departamento'], 'x': date, 'y': elem['Casos']})
        }
        return accum;
      }, []);
  }).then((accum) => {
    var datasets = {};
    accum.forEach((elem1) => {
      elem1.forEach(elem => {
        if (datasets[elem['dataset']] != undefined) {
          datasets[elem['dataset']].push({'x': elem['x'], 'y': elem['y']})
        } else {
          datasets[elem['dataset']] = [{'x': elem['x'], 'y': elem['y']}]
        }
      })
    })
    return fs.writeFileAsync(destPath, JSON.stringify(datasets));
  })
}).catch((err) => {
  console.log(err)
});
