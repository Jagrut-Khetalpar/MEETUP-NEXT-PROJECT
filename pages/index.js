import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/1920px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
//     address: "Nalanda University - The Hub Of Knowledge,Bihar",
//     description: "This is first meetup",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/330px-Konarka_Temple.jpg",
//     address: "Konark Sun Temple,Odisha",
//     description: "This is second meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is home page of Meetup." />
      </Head>
      <MeetupList meetups={props.meetups} key={props.meetups.id} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //Fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://khetalparjagrut:Z1LXYGK4RCdfAQLi@cluster0.1ut9eln.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
