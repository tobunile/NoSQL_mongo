#todo checken ob alles in virtueller Maschine funktioniert(getestet in normalem Rechner)
#Ausfuehren mit Befehl nach Doppelpunkt: sudo ./Aufgabe_4_Part1.sh
sudo mongod --dbpath /var/lib/mongodb/ --shutdown
sudo killall mongod
sudo killall mongos
sudo rm -rf /home/nosql/mongo

#Anlegen der Replicasets
mkdir -p /home/nosql/mongo/rs0/n0 /home/nosql/mongo/rs0/n1 /home/nosql/mongo/rs0/n2 /home/nosql/mongo/logs
mongod --replSet rs0 --logpath /home/nosql/mongo/logs/rs0-n0.log --dbpath /home/nosql/mongo/rs0/n0 --port 37017 --fork --shardsvr --smallfiles
mongod --replSet rs0 --logpath /home/nosql/mongo/logs/rs0-n1.log --dbpath /home/nosql/mongo/rs0/n1 --port 37018 --fork --shardsvr --smallfiles
mongod --replSet rs0 --logpath /home/nosql/mongo/logs/rs0-n2.log --dbpath /home/nosql/mongo/rs0/n2 --port 37019 --fork --shardsvr --smallfiles

mkdir -p /home/nosql/mongo/rs1/n0 /home/nosql/mongo/rs1/n1 /home/nosql/mongo/rs1/n2
mongod --replSet rs1 --logpath /home/nosql/mongo/logs/rs1-n0.log --dbpath /home/nosql/mongo/rs1/n0 --port 47017 --fork --shardsvr --smallfiles
mongod --replSet rs1 --logpath /home/nosql/mongo/logs/rs1-n1.log --dbpath /home/nosql/mongo/rs1/n1 --port 47018 --fork --shardsvr --smallfiles
mongod --replSet rs1 --logpath /home/nosql/mongo/logs/rs1-n2.log --dbpath /home/nosql/mongo/rs1/n2 --port 47019 --fork --shardsvr --smallfiles

############An dieser Stelle kaeme Aufgabe_4_Part2.sh#################

#Starten der Config Server
mkdir -p /home/nosql/mongo/config/c0 /home/nosql/mongo/config/c1 /home/nosql/mongo/config/c2
mongod --logpath /home/nosql/mongo/logs/c0.log --dbpath /home/nosql/mongo/config/c0 --port 57017 --fork --configsvr --smallfiles
mongod --logpath /home/nosql/mongo/logs/c1.log --dbpath /home/nosql/mongo/config/c1 --port 57018 --fork --configsvr --smallfiles
mongod --logpath /home/nosql/mongo/logs/c2.log --dbpath /home/nosql/mongo/config/c2 --port 57019 --fork --configsvr --smallfiles

#Starten von mongos
mongos --logpath /home/nosql/mongo/logs/mongos.log --configdb tob-P55-UD3:57017,tob-P55-UD3:57018,tob-P55-UD3:57019 --port 27017 --fork
