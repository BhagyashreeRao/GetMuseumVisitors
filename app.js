const express = require('express');
const app = express()

const port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const visitors = require('./routes/visitors')

app.use('/api/visitors',visitors)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})