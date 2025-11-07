// List all countries
export default function CountryList({ countries }) {
  console.log("🎨 Rendering CountryList with countries:", countries);

  const renderCountry = () => {
    return !countries?.length ? (
      <div>Loading countries...</div>
    ) : (
      countries.map((country) => (
        <li key={"country_" + country._id}>
          {country.country_name}
        </li>
      ))
    );
  };

  return (
    <div>
      <h2>Countries List</h2>
      <ul>{renderCountry()}</ul>
    </div>
  );
}