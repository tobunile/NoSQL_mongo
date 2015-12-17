	//Fügen Sie die beiden Replica Sets als Shards zum verteilten MongoDB-Cluster hinzu 
sh.addShard("rs0/nosql-VirtualBox:37017")
sh.addShard("rs1/nosql-VirtualBox:47017")

	//Erstellen Sie mit db.createCollection("zips") eine neue (leere) Dokumentenkollektion 
db.createCollection("zips")

/*geeigneter Sharding Key:
Ziel ist es, die Dokumente möglichst gleichmäßig über die zur Verfügung stehenden Shards zu verteilen und gleichzeitig
zu vermeiden, dass aufeinanderfolgende Einfügeoperationen immer vom gleichen Shard zu bearbeiten sind!

Möglichst Gleichmäßige Verteilung mit _id, weil fortlaufende Nummer. Es gibt genau so viele _id wie Datensätze.
Vermeiden von 2. Teil mit hash(_id)
*/


	//Aktivieren Sie das Sharding für die Datenbank test und die Kollektion zips
sh.enableSharding("test")
sh.shardCollection("test.zips", {"_id":"hashed"})

	//Importieren Sie mittels mongoimport -d test -c zips /home/nosql/Desktop/zips.json die Dokumente des Datensatzes in die leere Datenbank
exit
//führe folgenden Befehl aus:
//mongoimport -d test -c zips /home/nosql/Desktop/zips.json 

//ermitteln sie anschließend die Intervallgrenzen der erzeugten Chunks???(durch Hashing nicht sinnvoll!Oder?)
//sh.status()
//db.zips.getShardDistribution()
/* evtl. testen von Einfügeoperationen:

db.zips.insert({_id:1234567})
db.zips.find({_id:1234567}).explain()

db.zips.insert({_id:1234568})
db.zips.find({_id:1234568}).explain()

db.zips.insert({_id:1234569})
db.zips.find({_id:1234569}).explain()
*/