import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = ({ events }) => {
  const featureEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="decription"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
