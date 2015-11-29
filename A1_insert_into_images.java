package de.uni_leipzig.dbs.no_sql;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static java.util.Arrays.asList;

public class A1_insert_into_images {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("test");
		MongoCollection collection = database.getCollection("images");
		
		
		Document doc4 = new Document("_id", 4)
							.append("name", "hawaii.png")
							.append("time", "17:59")
							.append("user", "john")
							.append("camera", "nikon")
							.append("info", new Document("width",128).append("height", 64).append("size", 92834))
							.append("tags", asList("maui","tuna"));
		collection.insertOne(doc4);
		Document doc5 = new Document("_id", 5)
							.append("name", "hawaii.gif")
							.append("time", "17:58")
							.append("user", "bob")
							.append("camera", "canon")
							.append("info", new Document("width",320).append("height", 128).append("size", 49287))
							.append("tags", asList("maui"));
		collection.insertOne(doc5);
		Document doc6 = new Document("_id", 6)
							.append("name", "island.gif")
							.append("time", "17:43")
							.append("user", "zztop")
							.append("camera", "nikon")
							.append("info", new Document("width",640).append("height", 480).append("size", 50398))
							.append("tags", asList("maui"));
		collection.insertOne(doc6);

	}

}
