import CountryItem from "./CountryItem";
function CountryList({ countries }) {
  let coutrySort = countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  // const events = useLoaderData();

  return (
    <>
      {coutrySort.map((cou) => (
        <CountryItem key={cou.name.common} country={cou} />
      ))}
    </>
  );
}
export default CountryList;
