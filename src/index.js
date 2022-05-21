import { MongoClient, ServerApiVersion } from 'mongodb'

async function connectToDb (uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  })

  try {
    await client.connect()
  } catch (error) {
    console.error('Mongodb connection failed', error)
    throw new Error('Mongodb connection failed')
  }
  console.log('Connected to Mongodb successfully!')

  return client.db('testDb')
}

export default {
  async fetch (request) {
    const db = await connectToDb(
      // Don't worry, this user has only read access to this database :)
      'mongodb+srv://testUser:JXPsUTdgWHEG1FF3@cluster0.nlg81.mongodb.net/?retryWrites=true&w=majority'
    )
    const collection = db.collection('testCollection')
    const doc = await collection.findOne({ name: 'test' })

    return new Response(doc)
  }
}
