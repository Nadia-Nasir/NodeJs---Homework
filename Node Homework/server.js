const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});

app.get('/' ,(req,res)=>{
    //res.sendFile(__dirname +'/users.json')
    res.sendFile(__dirname +'/firstPage.html')
})
app.get('/allUsers' ,(req,res) =>{
    fs.readFile(__dirname +"/"+'users.json','utf8',function(err , data){
        data = JSON.parse(data);
        console.log(data);
        res.end(JSON.stringify(data));
    });

})

app.get('/:id' , (req,res)=>{
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var u = data['user'+ req.params.id];
        console.log(u);
        res.end(JSON.stringify(u));

    });

})


// app.post('/adduser' , (req,res)=>{
//     res.send('hello');

// })
app.post('/addUser', urlencodedParser, function (req, res) {
    // First read existing users.
    response = {
        id:req.body.id,
        name : req.body.name
     };
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user" + req.body.id] = response;

        console.log(data);
        
        res.end( JSON.stringify(data));

        var json = JSON.stringify(data); 
        fs.writeFile('users.json', json); 
        
    });

   
 })

 app.post('/deleteUser', urlencodedParser, function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
       
        delete data['user' + req.body.d_id]
        console.log( data );
        res.end( JSON.stringify(data));
        
        var json = JSON.stringify(data); 
        fs.writeFile('users.json', json); 
    });

 });

 app.post('/showUser', urlencodedParser, function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
       
        var user =  data['user' + req.body.s_id]
        console.log( user );
        res.end( JSON.stringify(user));   
    });

 });

var server = app.listen(8080 , function(){
    var host = server.address.address
    var port = server.address.port

    console.log('Server listing at http:// %s : %s',host,port)
})

//===================================
// app.use(express.static('Public'));

// app.get('/' ,(req , res) => {
//     res.send('Hello Image');
// })

// var server = app.listen(8080 , function(){
//     var host = server.address.address
//     var port = server.address.port

//     console.log('Server listing at http:// %s : %s',host,port)
// })
//================================
// const express = require('express');
// const app = express();
// const router = express.Router();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// let todos = [{
//     id: 0,
//     text: 'Nadia'
// }, {
//     id: 1,
//     text: 'Ahmed'
// }];

// router.get('/', (req, res) => {
//   res.json(todos);
// })

// router.post('/', (req, res) => {
//     const todo = req.body.todo
//     todos.push(req.body.todo);
//     res.json(todos);
// });

// router.put('/', (req, res) => {

// });

// router.delete('/', (req, res) => {
  
// })

// app.use('/todo', router);

// let port = 3000;
// app.listen(port, () => {
//   console.log('Example app listening on port ' + port);
// });