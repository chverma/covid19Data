var request = require("request");
var apiAddress = 'https://dadesobertes.gva.es/ca/api/3/action/datastore_search'
var resource_param = 'resource_id'
var idNewCases = '446fdb89-918f-4737-92fd-c4c6132621e8'

var resources = []
resources.push({'date': '12042020', 'resId': '446fdb89-918f-4737-92fd-c4c6132621e8'})
resources.push({'date': '13042020', 'resId':'8bf90699-99bc-4715-86d6-55358b0586cc'})
resources.push({'date': '14042020', 'resId': '19d427a7-1dd8-4740-afc1-30e8199bd387'})
resources.push({'date': '15042020', 'resId': 'e13ecd47-c031-4630-9636-7d0c75a9a1b9'})
resources.push({'date': '16042020', 'resId': '39cdebca-3b8f-46ac-8983-90cc97f3ae0a'})
resources.push({'date': '17042020', 'resId': 'e713a524-3ef9-4e63-be4c-8cfb7839e4f0'})
resources.push({'date': '18042020', 'resId': '495c3fa9-9c71-49e3-8f2a-0a75217d4d1d'})
resources.push({'date': '19042020', 'resId': '4dc84ad9-ef7d-44f3-adde-52335d022b2f'})
resources.push({'date': '20042020', 'resId': 'ce239012-28e8-45a4-973e-33d779fe2c3f'})
resources.push({'date': '21042020', 'resId': 'fbebd9ac-9d4d-407f-b950-674c14ac35ed'})
resources.push({'date': '22042020', 'resId': '16872c78-a471-4fe8-bbf8-a4588520fa79'})
resources.push({'date': '23042020', 'resId': '4d34c4ab-31d2-48c1-8e92-688c80735ad3'})
resources.push({'date': '24042020', 'resId': '5755690f-9da9-4255-9c8f-30c71f45939c'})
resources.push({'date': '25042020', 'resId': '9626946c-9fb3-4051-bb33-08f50d2063a9'})
resources.push({'date': '26042020', 'resId': 'ab0668a2-c32d-4727-b081-7378f09271e5'})
resources.push({'date': '27042020', 'resId': '83bab0ff-0c4a-4b30-84f4-c425e9c13590'})

resources.forEach(function (value, key) {
    request({
      uri: apiAddress + '?' + resource_param + '=' + value['resId'],
      method: 'GET',
      param: {
        name: "Bob"
      },
      agentOptions: {
        ciphers: 'AES128-SHA',
      }
    }, function(error, response, body) {
      var res = JSON.parse(body);
      const fs = require('fs');

      fs.writeFile("data/" + value['date'] + ".json", JSON.stringify(res.result.records), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
      console.log(res.result.records)
    });
})
