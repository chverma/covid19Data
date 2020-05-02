var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var directoryPath = path.join(__dirname, 'data');
var destPath = path.join(__dirname, 'data', 'all.json');

fs.unlinkAsync(destPath)
  .catch(err => console.error(err))
  .then(_ => {
    return fs.readdirAsync(directoryPath)
      .map((file) => {
        var fileDetails = file.split('.')[0];
        var day = fileDetails.substring(6, 8);
        var month = fileDetails.substring(4, 6);
        var year = fileDetails.substring(0, 4);
        var strDate = `${year}-${month}-${day}`;
        var date = new Date(strDate);
        if (file === '.gitignore') {
          return [];
        }
        return fs.readFileAsync(path.join(__dirname, 'data', file))
          .then((res) => JSON.parse(res)
          ).reduce((accum, elem) => {
            // On May 1, they changed the columns names
            if (elem['Departamento de Salud'] !== undefined) {
              elem.Departamento = elem['Departamento de Salud'];
              elem.Casos = elem['Casos acumulados desde 31-01-2020'];
            }
            if (elem.Departamento != null) {
              accum.push({ dataset: elem.Departamento, x: date, y: elem.Casos });
            }
            return accum;
          }, []);
      }).then((accum) => {
        var datasets = {};
        accum.forEach((elem1) => {
          elem1.forEach(elem => {
            if (datasets[elem.dataset] !== undefined) {
              datasets[elem.dataset].push({ x: elem.x, y: elem.y });
            } else {
              datasets[elem.dataset] = [{ x: elem.x, y: elem.y }];
            }
          });
        });
        return fs.writeFileAsync(destPath, JSON.stringify(datasets))
          .then(_ => console.log('Processed!'));
      });
  }).catch((err) => {
    console.log(err);
  });
