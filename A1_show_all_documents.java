package de.uni_leipzig.dbs.no_sql;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import org.bson.Document;

public class A1_show_all_documents {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("test");
		FindIterable<Document> iterable = database.getCollection("images").find();
		
		iterable.forEach(new Block<Document>() {

			@Override
			public void apply(Document doc) {
				System.out.println(doc);
			}
		});
	}

}
