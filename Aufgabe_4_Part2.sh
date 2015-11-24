###############Initialisieren Sie die Replica Sets rs0 und rs1 bestehend aus den ersten bzw. letzten drei gestarteten mongod-Prozessen

###Anmerkung: Dieses Skript verhaelt sich nichtdeterministisch(funktioniert nur manchmal). Copy-pasten der Befehle funktioniert immer!
###Anmerkuung: Um vom Shellskript Befehle an den Mongoclient zu uebergeben wird folgende Schreibweise verwendet(Bsp.):
# mongo localhost:37017 --eval rs.initiate() #mehr info mit: mongo --help

#initialisiere 1. Replicaset
#dieser mongod wird damit dem Replicaset hinzugefuegt
mongo --port 37017  --eval "rs.initiate()"

#todo hostnamen an virtuelle Maschine anpassen
#hinzufuegen der anderen 2 mongod im Replicaset
mongo --port 37017  --eval "rs.add(\"tob-P55-UD3:37018\")"
mongo --port 37017  --eval "rs.add(\"tob-P55-UD3:37019\")"

#initialisiere 2. Replicaset
#dieser mongod wird damit dem Replicaset hinzugefuegt
mongo --port 47017  --eval "rs.initiate()"

#hinzufuegen der anderen 2 mongod im Replicaset
mongo --port 47017  --eval "rs.add(\"tob-P55-UD3:47018\")"
mongo --port 47017  --eval "rs.add(\"tob-P55-UD3:47019\")"
