	//Ermitteln Sie mithilfe des Aggregation Frameworks,
	//an welche Email-Adresse die zweitmeisten
	//Emails gesendet wurden

//Query zum finden aller Dokumente die mehr als 1 Empfänger haben:
//	db.messages.find({"headers.To.1":{$exists:1}})

//iterativer Aufbau:
//	db.messages.aggregate([])
//Wie angegeben erst einmal beschraenkt auf 1 Absender.
/*
db.messages.aggregate([
{$match:{"headers.From":"don.black@enron.com"}}
])
*/
//Einschraenken jedes Dokument auf "_id" und "headers.To" feld:
/*
db.messages.aggregate([
{$match:{"headers.From":"don.black@enron.com"}},
{$project:{"headers.To":1}}
])
*/
//benutzen von unwind um Array zu zerlegen
/*
db.messages.aggregate([
{$match:{"headers.From":"don.black@enron.com"}},
{$project:{"headers.To":1}},
{$unwind:"$headers.To"}
])
*/
//gruppieren nach "headers.To" und aufsummieren
/*
db.messages.aggregate([
{$match:{"headers.From":"don.black@enron.com"}},
{$project:{"headers.To":1}},
{$unwind:"$headers.To"},
{$group:{_id:"$headers.To",count:{$sum:1}}}
])
*/
//Einschraenkung aufheben, sortieren nach "count"(absteigend) und limitieren auf 5
/*
db.messages.aggregate([
{$project:{"headers.To":1}},
{$unwind:"$headers.To"},
{$group:{_id:"$headers.To",count:{$sum:1}}},
{$sort:{"count":-1}},
{$limit:5}
])
*/
//mit skip und limit den Zweithaeufigsten Empfaenger ermitteln
/*
db.messages.aggregate([
{$project:{"headers.To":1}},
{$unwind:"$headers.To"},
{$group:{_id:"$headers.To",count:{$sum:1}}},
{$sort:{"count":-1}},
{$skip:1},
{$limit:1}
])
*/
//nur Mail-Adresse ausgeben
db.messages.aggregate([
{$project:{"headers.To":1}},
{$unwind:"$headers.To"},
{$group:{_id:"$headers.To",count:{$sum:1}}},
{$sort:{"count":-1}},
{$skip:1},
{$limit:1},
{$project:{"zweithaeufigster_Empfaenger":"$_id","_id":0}}
])









