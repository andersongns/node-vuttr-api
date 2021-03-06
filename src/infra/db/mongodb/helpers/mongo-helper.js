const { MongoClient, ObjectId } = require('mongodb')

module.exports = class MongoHelper {
  static async connect (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  }

  static async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  }

  static async getCollection (name) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.db.collection(name)
  }

  static parserItem (data) {
    if (!data) return
    const { _id, ...rest } = data
    return { id: _id.toString(), ...rest }
  }

  static parserCollection (collection) {
    return collection.map(c => this.parserItem(c))
  }

  static isObjectId (id) {
    return ObjectId.isValid(id)
  }

  static toObjectId (id) {
    return ObjectId(id)
  }
}
