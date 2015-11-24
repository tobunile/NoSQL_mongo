	//Erstellen Sie eine Dokumentenkollektion images in der Datenbank test
db.createCollection("images")
	//Fügen Sie mithilfe der Mongo Shell die ersten drei Datensätze der Tabelle auf Folie 3-5 des Vorlesungsskriptes in
	//die erstellte Dokumentkollektion ein (das Attribut id soll auf MongoDBs Id-Attribut _id abgebildet werden)
db.images.insert(
{_id:1,"name":"fish.jpg","time":"17:46","user":"bob","camera":"nikon",
"info":{"width":100,"height":200,"size":12345},"tags":["tuna","shark"]})

db.images.insert(
{_id:2,"name":"trees.jpg","time":"17:57","user":"john","camera":"canon",
"info":{"width":30,"height":250,"size":32091},"tags":["oak"]})

db.images.insert(
{_id:3,"name":"snow.png","time":"17:56","user":"john","camera":"canon",
"info":{"width":64,"height":64,"size":1253},"tags":["tahoe","powder"]}) 
	//Geben Sie alle eingefügten Dokumente in der Mongo Shell aus (Funktion pretty() kann zur Formatierung verwendet werden)
db.images.find().pretty()

/**************************************************/
/************Java-Stuff****************************/
/**************************************************/

	//Löschen Sie die Kollektion images
//db.images.drop()