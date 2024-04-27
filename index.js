const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Jute and craft is running');
})

app.listen(port,()=>{
    console.log(`crud is runnig on port, ${port}`);
})