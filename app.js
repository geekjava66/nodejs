const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('graphql-request').request;

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
res.send('<form action="/product" method="POST"><input type="text" name ="title"> <button type = "submit">Add Product</button></input></form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    });

app.get('/getcourse/:courseId', (req, res, next) => {
     res.send(req.params.courseId);
}); 
app.use('/', (req, res, next) => {
res.send('<h1>Hello from express');
});


const fetchCourseDetails = (id) => {
    //create graphqlquery
    const query = `{
        course(id: 1) {
            title
            author
            description
            topic
            url
        }
    }`
    request('http://localhost:4000/graphql', query).then(data => console.log(data)) 
};

app.listen(8009);   

module.exports = fetchCourseDetails;