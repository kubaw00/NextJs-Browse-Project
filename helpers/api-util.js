export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-84a37-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}