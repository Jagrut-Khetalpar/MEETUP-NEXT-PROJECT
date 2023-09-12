import { MongoClient } from "mongodb";

//new-meetup
//Method = POST

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, description, address, image } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://khetalparjagrut:Z1LXYGK4RCdfAQLi@cluster0.1ut9eln.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
