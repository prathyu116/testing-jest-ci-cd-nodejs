
const app =require("./index")

const connect = require('./config/db')

app.listen(5000, async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  
    console.log("list 5000");
  });
  