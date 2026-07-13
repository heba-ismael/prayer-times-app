import { useState, useRef, useEffect } from "react"
import { cities, countries } from "../i18n"

function CitySelector({ lang, cityQuery, countryQuery, resolvedCountry, locationMode, onCityChange, onCountryChange, onUseLocation, t }) {
  const [showCityList, setShowCityList] = useState(false)
  const [showCountryList, setShowCountryList] = useState(false)
  const cityBoxRef = useRef(null)
  const countryBoxRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityBoxRef.current && !cityBoxRef.current.contains(e.target)) setShowCityList(false)
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target)) setShowCountryList(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  const cityDisplay = locationMode === "auto" ? t.currentLocation : cityQuery
  const knownCountry = countries.find((c) => c.en === resolvedCountry)
  const filteredCities = cities
    .filter((c) => !knownCountry || c.country === resolvedCountry)
    .filter((c) =>
      c.name[lang].toLowerCase().includes(cityDisplay.toLowerCase()) || c.value.toLowerCase().includes(cityDisplay.toLowerCase())
    )
  const filteredCountries = countries.filter((c) =>
    c[lang].toLowerCase().includes(countryQuery.toLowerCase())
  )

  return (
    <div className="city">
      <h3>{t.cityLabel}</h3>

      <div className="dropdown-wrap" ref={cityBoxRef}>
        <input
          value={cityDisplay}
          onChange={(e) => onCityChange(e.target.value)}
          onFocus={() => setShowCityList(true)}
          placeholder={t.cityPlaceholder}
          readOnly={locationMode === "auto"}
        />
        {showCityList && locationMode !== "auto" && filteredCities.length > 0 && (
          <div className="dropdown-list">
            {filteredCities.map((c) => (
              <div
                key={c.value}
                className="dropdown-item"
                onClick={() => { onCityChange(c.name[lang]); setShowCityList(false) }}
              >
                {c.name[lang]}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown-wrap" ref={countryBoxRef}>
        <input
          value={locationMode === "auto" ? "" : countryQuery}
          onChange={(e) => onCountryChange(e.target.value)}
          onFocus={() => setShowCountryList(true)}
          placeholder={t.countryPlaceholder}
          disabled={locationMode === "auto"}
        />
        {showCountryList && locationMode !== "auto" && filteredCountries.length > 0 && (
          <div className="dropdown-list">
            {filteredCountries.map((c) => (
              <div
                key={c.en}
                className="dropdown-item"
                onClick={() => { onCountryChange(c[lang]); setShowCountryList(false) }}
              >
                {c[lang]}
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="button" className="location-btn" onClick={onUseLocation}>{t.useMyLocation}</button>
    </div>
  )
}

export default CitySelector
