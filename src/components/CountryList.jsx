import CountryItem from "./CountryItem";
import Search from "../components/Search";

function CountryList({ countries }) {
  let coutrySort = countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  // const events = useLoaderData();

  return (
    <>
      <Search />
      <section id="main" className="bDark">
        {coutrySort.map((cou) => (
          <CountryItem key={cou.name.common} country={cou} />
        ))}
      </section>
    </>
  );
}
export default CountryList;
