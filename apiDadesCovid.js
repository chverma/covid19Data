var request = require('request');
var apiAddress = 'https://dadesobertes.gva.es/ca/api/3/action/datastore_search';
var resourceParam = 'resource_id';

var resources = [];
resources.push({ date: '20200412', resId: '446fdb89-918f-4737-92fd-c4c6132621e8' });
resources.push({ date: '20200413', resId: '8bf90699-99bc-4715-86d6-55358b0586cc' });
resources.push({ date: '20200414', resId: '19d427a7-1dd8-4740-afc1-30e8199bd387' });
resources.push({ date: '20200415', resId: 'e13ecd47-c031-4630-9636-7d0c75a9a1b9' });
resources.push({ date: '20200416', resId: '39cdebca-3b8f-46ac-8983-90cc97f3ae0a' });
resources.push({ date: '20200417', resId: 'e713a524-3ef9-4e63-be4c-8cfb7839e4f0' });
resources.push({ date: '20200418', resId: '495c3fa9-9c71-49e3-8f2a-0a75217d4d1d' });
resources.push({ date: '20200419', resId: '4dc84ad9-ef7d-44f3-adde-52335d022b2f' });
resources.push({ date: '20200420', resId: 'ce239012-28e8-45a4-973e-33d779fe2c3f' });
resources.push({ date: '20200421', resId: 'fbebd9ac-9d4d-407f-b950-674c14ac35ed' });
resources.push({ date: '20200422', resId: '16872c78-a471-4fe8-bbf8-a4588520fa79' });
resources.push({ date: '20200423', resId: '4d34c4ab-31d2-48c1-8e92-688c80735ad3' });
resources.push({ date: '20200424', resId: '5755690f-9da9-4255-9c8f-30c71f45939c' });
resources.push({ date: '20200425', resId: '9626946c-9fb3-4051-bb33-08f50d2063a9' });
resources.push({ date: '20200426', resId: 'ab0668a2-c32d-4727-b081-7378f09271e5' });
resources.push({ date: '20200427', resId: '83bab0ff-0c4a-4b30-84f4-c425e9c13590' });
resources.push({ date: '20200428', resId: '5b5500d7-7e92-4915-99de-a367dcbdbc40' });
resources.push({ date: '20200429', resId: '4d8bb99f-912f-4196-bcb0-88f4de029694' });
resources.push({ date: '20200430', resId: '627912d6-10e0-4c2d-9a40-6c4e37333199' });
resources.push({ date: '20200501', resId: '5173518e-3cfd-408e-9348-fc32a83b8dcf' });

resources.forEach(function (value, key) {
  request({
    uri: apiAddress + '?' + resourceParam + '=' + value.resId,
    method: 'GET',
    param: {
      name: 'Bob'
    },
    agentOptions: {
      ciphers: 'AES128-SHA'
    }
  }, function (error, response, body) {
    if (error) {
      console.error(error);
    }
    var res = JSON.parse(body);
    const fs = require('fs');

    fs.writeFile(`data/${value.date}.json`, JSON.stringify(res.result.records), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
    console.log(res.result.records);
  });
});
