//module.exports = {
//    path: '/admin/microservices',
//    template: function (){
//        var jf = require('jsonfile')
//        var file = 'static/get/microservices.json';
//        return jf.readFileSync(file);
//    }
//};
'use strict';

var faker = require('faker');

module.exports = {
    path: '/admin/microservices',
    template: function (){


        var objects = [];

        var ringUuidArray = [];

        for(var z = 0; z < 50; z++){
            ringUuidArray.push(faker.random.uuid());
        }


        var apiTypeArray = ['HCK','PUB','MHT'];




        for(var i = 0; i < 100; i++){

            var randomRingUuid = ringUuidArray[Math.floor(Math.random() * ringUuidArray.length)];



            var apisArray = [];
            var randomIP = faker.internet.ip();

            for(var y = 0; y < 4; y++){

                var api = {
                    path: '/' + faker.hacker.adjective(),
                    host: randomIP,
                    port:9991,
                    type: apiTypeArray[Math.floor(Math.random() * apiTypeArray.length)],
                    faulty: faker.helpers.randomNumber()
                }


                apisArray.push(api);
            }


            var obj = {

                agent: {
                    ring: {
                        uuid: randomRingUuid,
                        location: {
                            country: {
                                name: faker.address.country()
                            },
                            region: {
                                name: faker.address.state()
                            },
                            city: {
                                name: faker.address.city()
                            },
                            gps: {
                                latitude: faker.address.latitude(),
                                longitude: faker.address.longitude()
                            }
                        }
                    },
                    iden: {
                        uuid: faker.random.uuid()
                    },
                    accessTime: {
                        value: 1430758449840
                    }
                },
                name: faker.company.companyName(),
                apis: apisArray,
                faulty: {
                    value: faker.helpers.randomNumber()
                },
                lastUpdated: {
                    value: 1430758464838
                },
                lastChecked: {
                    value: 1430758449840
                }
            };

            objects.push(obj);

        }


        return objects;


    }
};
