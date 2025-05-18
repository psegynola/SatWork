const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const {isInvalidEmail, isEmptyPayload} = require('./validator')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function (req, res) {

    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(dbName)
    const collection = db.collection(collName)

    const result = await collection.findOne({id:1})
    console.log(result)
    client.close()

    response = {}
    if(result !==null){
        response = {
            name: result.name,
            email: result.email
        }
    }
    res.send(response)
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.status(404).send({error: 'No data provided'})
    }else{

            await client.connect()
            console.log('Connected to MongoDB')

            const db = client.db(dbName)
            const collection = db.collection(collName)

            payload['id']=1
            const updatedValues = {$set:payload}
            await collection.updateOne({id:1}, updatedValues, {upsert: true})
            client.close()

        res.send({info: 'Profile updated successfully'})
    }

    })

const server = app.listen(3000, function (){
    console.log('Server is running on port 3000')
    })

module.exports = {
    app,
    server
}