var express = require('express')
var graphQLHTTP = require('express-graphql')

const cors = require('cors')
var Schema = require('./schema')
var app = express();

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use('/', graphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(process.env.PORT || 8080, (err) => {
  if (err)
    return console.error(err);
  console.log(`GraphQL Server is now running on http://localhost:${process.env.PORT || 8080}`);
});
