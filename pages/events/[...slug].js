import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();

  const filteredData = useRouter().query.slug;
  console.log('slug', filteredData);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://nextjs-course-84a37-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='decription' content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='decription'
        content={`All events for ${filteredMonth}/${filteredYear}.`}
      />
    </Head>
  );

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter, please adjust yout values!</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const filteredYear = +filteredData[0];
//   const filteredMonth = +filteredData[1];

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },

//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         month: filteredMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
