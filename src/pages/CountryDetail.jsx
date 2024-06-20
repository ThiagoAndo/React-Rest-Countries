import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import CountryDet from "../components/CountryDet";

function CountryDetail() {
  const { country } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={country}>
          {
            (loadedCount) => { <CountryDet country={loadedCount} />}
          }
        </Await>
      </Suspense>
      {/* <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense> */}
    </>
  );
}

export default CountryDetail;

async function loadCountry(name) {
  const response = await fetch(
    ` https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function loadTime(name) {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request, params }) {
  const name = params.countName;

  return defer({
    country: await loadCountry(name),
    // time: loadTime(),
  });
}

// export async function action({ params, request }) {
//   const eventId = params.eventId;
//   const response = await fetch("http://localhost:8080/events/" + eventId, {
//     method: request.method,
//   });

//   if (!response.ok) {
//     throw json(
//       { message: "Could not delete event." },
//       {
//         status: 500,
//       }
//     );
//   }
//   return redirect("/events");
// }
