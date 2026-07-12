import { cities, countries } from "../i18n"

function CitySelector({ lang, cityQuery, countryQuery, locationMode, onCityChange, onCountryChange, onUseLocation, t }) {
  return (
    <div className="city">
      <h3>{t.cityLabel}</h3>
      <input
        list="city-options"
        value={locationMode === "auto" ? t.currentLocation : cityQuery}
        onChange={(e) => onCityChange(e.target.value)}
        placeholder={t.cityPlaceholder}
        readOnly={locationMode === "auto"}
      />
      <datalist id="city-options">
        {cities.map((c) => (
          <option key={c.value} value={c.value}>{c.name[lang]}</option>
        ))}
      </datalist>

      <input
        list="country-options"
        value={locationMode === "auto" ? "" : countryQuery}
        onChange={(e) => onCountryChange(e.target.value)}
        placeholder={t.countryPlaceholder}
        disabled={locationMode === "auto"}
      />
      <datalist id="country-options">
        {countries.map((c) => (
          <option key={c.en} value={c.en}>{c[lang]}</option>
        ))}
      </datalist>

      <button type="button" className="location-btn" onClick={onUseLocation}>{t.useMyLocation}</button>
    </div>
  )
}

export default CitySelector
