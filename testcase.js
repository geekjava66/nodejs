console.log('Hello...write test cases here');
const fetchCourseDetails = require('./app');
const {graphql} = require('graphql');
const {makeExecutableSchema, addMockFunctionsToSchema} = require('graphql-tools');
var assert = require('assert');
const express = require('express');
const { buildSchema } = require('graphql');
const grapghQLHttp = require('express-graphQL');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mocker = require('easygraphql-mock');
const app = express();
const cors = require('cors');

app.set('port', 4231);
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({extended: true}));
    const schemacode = fs.readFileSync(path.join(__dirname, 'schema.gql'),'utf8');
    const fsschema = buildSchema(schemacode)
    console.log(fsschema)
    const mock = mocker(schemacode)
    const resolver = Object.assign({}, mock.Query, mock.Mutation)
    app.use(cors())
    app.use('/', (req, res) => {
        grapghQLHttp({
            fsschema,
            rootValue: resolver,
            graphiql: true
        })(req,res)
    });
    const server = app.listen(app.get('port'), () => {
        console.log(`Server is running on port ${server.address().port}`)
    })
    
describe('GraphQL Test', function(){
    
    /*const into_three = fetchCourseDetails(1);
    if(into_three === 3){
     console.log('Sucess');
    }else {
        console.log('Failure');
    }
    console.log('Mocking GraphQL Server starts here.............');
var schemaString = `
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`;
const schema = makeExecutableSchema({ typeDefs: schemaString });
addMockFunctionsToSchema({ schema });
const query = `{
    course(id: 1) {
        title
        author
        description
        topic
        url
    }
}`
graphql(schema, query).then((result) => console.log('Got result', result));    */
});



