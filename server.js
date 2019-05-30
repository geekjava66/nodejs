var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        fetchDetail(id: Int!): FetchDetailRequest
        fetchDetails(): [FetchDetailRequest]
    },
    type FetchDetailRequest {
        xrefId: Int,
        sourceCode: String
    }
`);
var detailData = [
    {xrefId: 1, sourceCode: "CDB"},
    {xrefId: 2, sourceCode: "MHI"},
    {xrefId: 3, sourceCode: "ABC"},
    {xrefId: 4, sourceCode: "CDE"}
]

const getDetail = (xrefId) => {
    return detailData.filter(detail => {
        detail.xrefId == xrefId;
    })[0];
} 

const getDetails = () =>{
    return detailData;
}


// Root resolver
var root = {
    fetchDetail: getDetail,
    fetchDetails: getDetails  
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));