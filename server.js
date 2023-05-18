const express = require("express");
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routes/user')
const requestRouter = require('./routes/request')

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(requestRouter);


app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
