use myNewDB

db.createCollection("books")
{ x: 1 } 



db.books.insertOne( 
    {
        "title": "Dory Fantasmagory",
        "description": "About Dory Fantasmagory",
        "authors": "Abby Hanlon"
    }
)
{
    acknowledged: true,
    insertedId: ObjectId("643ab8427b6d63e24dc5ba9c")
}


db.books.find({
    "title": "Dory Fantasmagory"
})
[
  {
    _id: ObjectId("643ab8427b6d63e24dc5ba9c"),
    title: 'Dory Fantasmagory',
    description: 'About Dory Fantasmagory',
    authors: 'Abby Hanlon'
  }
]

db.books.updateOne( 
    {_id: ObjectId("643ab8427b6d63e24dc5ba9c")},
    {$set: { description: "CCC", authors: "DDD"}} 
)

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

////////////////////////////////////////////////////////////////////////////////////////

db.books.insertOne(
   {
        "title": "Dragons Love Tacos",
        "description": "About Dragons Love Tacos",
        "authors": "Adam Rubin"
    } 
)
{
  acknowledged: true,
  insertedId: ObjectId("643ab9127b6d63e24dc5ba9d")
}


db.books.find({
    "title": "Dragons Love Tacos"
})
[
  {
    _id: ObjectId("643ab9127b6d63e24dc5ba9d"),
    title: 'Dragons Love Tacos',
    description: 'About Dragons Love Tacos',
    authors: 'Adam Rubin'
  }
]


db.books.updateOne( 
    {_id: ObjectId("643ab9127b6d63e24dc5ba9d")},
    {$set: { description: "AAA", authors: "BBB"}} 
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

cscorner> db.books.find()
[
  {
    _id: ObjectId("643ab8427b6d63e24dc5ba9c"),
    title: 'Dory Fantasmagory',
    description: 'CCC',
    authors: 'DDD'
  },
  {
    _id: ObjectId("643ab9127b6d63e24dc5ba9d"),
    title: 'Dragons Love Tacos',
    description: 'AAA',
    authors: 'BBB'
  }
]