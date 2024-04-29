const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.q9r8zjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const craftCollection = client.db('craftDB').collection('craft');

    app.get('/JuteAndWoodenCraft',async(req,res)=>{
        const cursor = craftCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/JuteAndWoodenCraft/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await craftCollection.findOne(query);
        res.send(result);
    })

    app.post('/JuteAndWoodenCraft',async(req,res)=>{
        const craft = req.body;
        const result = await craftCollection.insertOne(craft);
        res.send(result);
    })

    app.put('/JuteAndWoodenCraft/:id',async(req,res)=>{
      const updateItem = req.body;
      const id =req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const item = {
        $set:{
          itemName:updateItem.itemName, 
          price:updateItem.price, 
          subCategoryName:updateItem.subCategoryName, 
          rating:updateItem.rating, 
          imgURL:updateItem.imgURL, 
          processTime:updateItem.processTime, 
          customize:updateItem.customize, 
          stock:updateItem.stock,
        }
      }
      const result = await craftCollection.updateOne(filter,item,options);
      res.send(result);
    })
    app.delete('/JuteAndWoodenCraft/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await craftCollection.deleteOne(query);
        res.send(result)
    })

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/',(req,res)=>{
    res.send('Jute and craft is running');
})

app.listen(port,()=>{
    console.log(`crud is runnig on port, ${port}`);
})