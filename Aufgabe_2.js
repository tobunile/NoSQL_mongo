/**********************this is the structure***************************
{
  "city": "ACMAR",
  "loc": [
    -86.51557,
    33.584132
  ],
  "pop": 6055,
  "state": "AL",
  "_id": "35004"
}
*/
	//SELECT city, pop, state FROM zips WHERE _id=35203
db.zips.find({"_id":"35203"},{"city":1,"pop":1,"state":1,"_id":0}).pretty()

	//SELECT * FROM zips WHERE pop>29778 AND (latitude>-86.4 OR longitude<40.2)
	//Hinweis: Mit dem Schlüssel "loc.i" können Sie auf das i-te Element des loc-Arrays zugreifen;
	//latitude entspricht der 0-ten Position; longitude entspricht der 1-ten Position
//iterativer Aufbau zum besseren Verständniss/Debugging
//db.zips.find().count()											29467
//db.zips.find({$and:[{},{$or:[{},{}]}]}).count()								29467
//db.zips.find({$and:[{"pop":{$gt:29778}},{$or:[{},{}]}]}).count()						2288
//db.zips.find({$and:[{"pop":{$gt:29778}},{$or:[{"loc.0":{$gt:-86.4}},{"loc.1":{$lt:40.2}}]}]}).count()		1983
db.zips.find({$and:[{"pop":{$gt:29778}},{$or:[{"loc.0":{$gt:-86.4}},{"loc.1":{$lt:40.2}}]}]}).pretty()






	//Erstellen Sie einen Index auf dem Attribut pop, um die Bearbeitung der obigen Anfrage zu beschleunigen
	//Hinweis: Mit der explain()-Methode können Sie sich Informationen über den Ausführungsplan anzeigen lassen
//db.zips.getIndexes()			zeige alle Indexe
//db.zips.createIndex( { pop: 1 } )	erzeuge Index
//db.zips.dropIndex( { "pop": 1 } )	lösche Index
//db.zips.find({$and:[{"pop":{$gt:29778}},{$or:[{"loc.0":{$gt:-86.4}},{"loc.1":{$lt:40.2}}]}]}).explain()

db.records.createIndex( { pop: 1 } )
//Der Ausfuehrungsplan der Query hat sich wie erwartet veraendert.