var http = require('http');
var assert = require('assert');
var $ = require('jquery');
global.$ = require('jquery');
// var chai = require('chai');
// var chaiHttp = require('chai-http');

// var MineCell = require('../views/ClassicCell')
// var ClassicCell = require('../views/ClassicCell')
// var HexCell = require('../views/ClassicCell')
// var ClassicCell = require('../views/ClassicCell')
// var GameTimer = require('../views/ClassicCell')
// var Game = require('../views/js/Game')
var Scores = require('../views/js/Scores')
// document.write('script type="text/javascript" src="../views/js/Score" ></script>');

var api = `http://software-frameworks-terraseraph.c9users.io:8081/api`;
var temp_id = "test1"

	describe("Load Scores", function() {
		it('Should return a list of users', function(done) {
		    var $ = require('jquery');
                $.ajax({
                    url: '../views/js/Scores',
                    dataType: 'script',
                    async: false,
                    success : function(){
            		    var scores = new Scores()
                        scores.load_scores('classic', function(dat){
                            console.log(dat)
                        })
                        
                    }
                });
		});
	});




// describe('HTTP Tests', function() {

// 	describe(api+'/users', function() {
// 		it('Should return a list of users', function(done) {
// 			http.get(api+'/users', function(response) {
// 				assert.equal(response.statusCode, 200);
//                 var body = '';
// 				response.on('data', function(d) {
// 					body += d;
// 				});
// 				response.on('end', function() {
// 				    body = JSON.parse(body)
// 				    // console.log(body)
// 					assert.equal(body.success, true);
// 				});
// 			    done();
// 			});
// 		});
// 	});
	
	
// 	describe(api+'/channel', function() {
// 		it('Should return a list of channels', function(done) {
// 			http.get(api+'/channel', function(response) {
// 				assert.equal(response.statusCode, 200);
//                 var body = '';
// 				response.on('data', function(d) {
// 					body += d;
// 				});
// 				response.on('end', function() {
// 				    body = JSON.parse(body)
// 				    // console.log(body)
// 					assert.equal(body.success, true);
// 				});
// 			    done();
// 			});
// 		});
// 	});
	
	
// 	describe(api+'/group', function() {
// 		it('Should return a list of groups', function(done) {
// 			http.get(api+'/group', function(response) {
// 				assert.equal(response.statusCode, 200);
//                 var body = '';
// 				response.on('data', function(d) {
// 					body += d;
// 				});
// 				response.on('end', function() {
// 				    body = JSON.parse(body)
// 				    // console.log(body)
// 					assert.equal(body.success, true);
// 				});
// 			    done();
// 			});
// 		});
// 	});
	
	
	
	
// });




// describe('API function Tests', function() {
	
// 	describe("Group Add, update, delete", function() {
// 	    var dat = {
// 	        group_name: "test_api_group",
//             group_admins: "test_group_admin"
// 	    }
//         it("Create a new group", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/group')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.message._id
//                 // console.log(temp_id)
//                 // console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 assert.equal(res.body.message.group_name, 'test_api_group')
//                 done();
//             });
//         })
//         it("Update a group", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        group_name: "update_test_group",
// 	            group_admins: ["update_test_group_admin"],
// 	            group_users: ["update_test_users"]
// 		    }            
//              chai.request(api)
//             .put('/group')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(temp_id)
//                 // console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 // assert.equal(res.body.message.group_name, 'update_test_group')
//                 done();
//             });
//         })
//         it("remove a group", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//              chai.request(api)
//             .delete('/group/'+temp_id)
//             // .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(temp_id)
//                 // console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });        
// 	});
	
	
// 	describe("Channel create, update, delete", function() {
// 		var temp_id
// 	    var dat = {
// 	      _id : temp_id,
//           channel_name: "test channel name",
//           group_id: "test_id",
//           channel_users: ['test_user']
// 	    }
//         it("Create a new channel", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/channel')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.message._id
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         })
//         it("Update a channel", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        group_name: "update_test_group",
// 	            group_admins: ["update_test_group_admin"],
// 	            group_users: ["update_test_users"]
// 		    }            
// 	        chai.request(api)
// 	        .put('/channel')
// 	        .send(dat)
// 	        .end(function (err, res) {
// 	            // chai.expect(res.body).to.be.json;   
// 	            chai.expect(res).to.have.status(200);
// 	            // console.log(temp_id)
// 	            // console.log(res.body)
// 	            assert.equal(res.body.success, true);
// 	            done();
// 	        });
//         })
//         it("remove a channel", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//             chai.request(api)
//             .delete('/channel/'+temp_id)
//             // .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(temp_id)
//                 // console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });
// 	});


// 	describe("User create, update, delete", function() {
// 		var temp_id
// 	    var dat = {
// 	      //_id : temp_id,
//           username: "testUser",
//           password: "123",
//           role: "user"
// 	    }
//         it("Create a new user", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/users')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.user._id
//                 // console.log(temp_id)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         })
//         it("Update a user", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        username: "update_user_name",
// 	            password: "321",
// 	            role: "super"
// 		    }            
// 	        chai.request(api)
// 	        .put('/users')
// 	        .send(dat)
// 	        .end(function (err, res) {
// 	            // chai.expect(res.body).to.be.json;   
// 	            chai.expect(res).to.have.status(200);
// 	            // console.log(temp_id)
// 	            // console.log(res.body)
// 	            assert.equal(res.body.success, true);
// 	            done();
// 	        });
//         })
//         it("remove a user", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//             chai.request(api)
//             .delete('/users/'+temp_id)
//             // .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(temp_id)
//                 // console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });
// 	});
// });
