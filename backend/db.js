const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://username:password@cluster0.8abbx.mongodb.net/dbName?retryWrites=true&w=majority', //Edit with your mongoDb infos
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('DB Connection Successfull'))
  .catch((err) => {
    console.error(err);
  });


module.exports = mongoose;