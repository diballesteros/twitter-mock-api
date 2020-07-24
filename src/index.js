const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const { setupDB } = require('./config/databaseConnection');
const isAuth = require('./middleware/isAuthenticated');
const cors = require('cors');

const app = express();
setupDB((v) => console.log(v));

app.use(isAuth);

app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
		pretty: true,
	})
);

app.listen(4000, () => {
	console.log('Now listening for requests on port 4000');
});
