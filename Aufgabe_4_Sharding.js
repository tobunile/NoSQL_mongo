//Fügen Sie die beiden Replica Sets als Shards zum verteilten MongoDB-Cluster hinzu
//nach folgendem Manual: https://docs.mongodb.org/manual/tutorial/deploy-shard-cluster/

//Fügen Sie die beiden Replica Sets als Shards zum verteilten MongoDB-Cluster hinzu 
sh.addShard("rs0/tob-P55-UD3:37017")
sh.addShard("rs1/tob-P55-UD3:47017")

//Erstellen Sie mit db.createCollection("zips") eine neue (leere) Dokumentenkollektion 
db.createCollection("zips")

/*geeigneter Sharding Key:
Ziel ist es, die Dokumente möglichst gleichmäßig über die zur Verfügung stehenden Shards zu verteilen und gleichzeitig
zu vermeiden, dass aufeinanderfolgende Einfügeoperationen immer vom gleichen Shard zu bearbeiten sind!

Möglichst Gleichmäßige Verteilung mit _id, weil fortlaufende Nummer. Es gibt genau so viele _id wie Datensätze.
Vermeiden von 2. Teil mit hash(_id)
*/


//Aktivieren Sie das Sharding für die Datenbank test und die Kollektion zips

//Sharding für Datenbank test
sh.enableSharding("test")

//Shard Collection zips
sh.shardCollection("test.zips", {"_id":"hashed"})

//Importieren Sie mittels mongoimport -d test -c zips /home/nosql/Desktop/zips.json die Dokumente des Datensatzes in die leere Datenbank
mongoimport -d test -c zips /home/nosql/Desktop/zips.json 

//ermitteln sie anschließend die Intervallgrenzen der erzeugten Chunks???(durch Hashing nicht möglich!oder?)
/*stattdessen Ueberpruefung(sanity-checks):
db.zips.find().count()
29467

exit
mongo --port 37017
db.zips.find().count()
14429

&&

db.zips.find().sort({_id:1}).limit(5)
Minimum = 01005
db.zips.find().sort({_id:-1}).limit(5)
Maximum = 99926

//sh.status() produces error (cause is mongo-hacker)        maybe not in virtual maschine
*/
