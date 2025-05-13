const express = require('express');
const {MongoClient,ServerApiVersion}=require('mongodb')
const cors=require('cors')
const app=express();
const port=process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//user:simpleDBUser
//pass:SQ4mbmvEYE8peFfn

const uri = "mongodb+srv://simpleDBUser:SQ4mbmvEYE8peFfn@xenpi.9qo9gbb.mongodb.net/?retryWrites=true&w=majority&appName=XenPi";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
        await client.connect()

        // const database=client.db('userdb')
        // const userCollection=database.collection('users')
        const userCollection=client.db('userdb').collection('users')
        

        app.get('/users',async(req,res)=>{
            const cursor=userCollection.find();
            const result=await cursor.toArray();
            res.send(result)
        })

        app.post('/users',async(req,res)=>{
             console.log('data in the server',req.body)
            const newUser=req.body;
            const result=await userCollection.insertOne(newUser)
            res.send(result)
        })



        await client.db('admin').command({ping:1})
         console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Simple crud Server running')
})

app.listen(port,()=>{
    console.log(`Simple crud server is running on, ${port}`)
})

// async function run(){
//     await
// }
// run().catch(console.dir)

// const run=async()=>{
//     await
// }
// run().catch(console.dir)


// try{

// }
// catch{

// }
// finally{

// }