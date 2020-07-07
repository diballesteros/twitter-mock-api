const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const setupDB = callback => {
    const uri = 'mongodb+srv://admin:XbkPACQm@cluster0-ufqxk.mongodb.net/TwitterMock?retryWrites=true&w=majority'

    mongoose.connect(uri);
    mongoose.connection.once('open', () => {
        callback('DB OK');
    })
};

module.exports = { setupDB };