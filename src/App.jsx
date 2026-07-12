import { useEffect, useRef, useState } from "react";
import Prayer from "./component/Prayer"
import Countdown from "./component/Countdown"
import QiblaCompass from "./component/QiblaCompass"
import WeekView from "./component/WeekView"
import ActionsBar from "./component/ActionsBar"
import CitySelector from "./component/CitySelector"
import { cities, prayerOrder, prayerLabels, adhkarAfterPrayer, phaseBackground, text } from "./i18n"

const toMinutes = (time) => {
  if (!time) return 0
  const [h, m] = time.slice(0, 5).split(":").map(Number)
  return h * 60 + m
}

const findCity = (query) => {
  if (!query) return null
  const q = query.trim().toLowerCase()
  return cities.find(c => c.value.toLowerCase() === q || c.name.ar === query.trim() || c.name.en.toLowerCase() === q) || null
}

function App() {

const [lang, setLang] = useState("ar")
const t = text[lang]

const [prayerTimes, setPrayerTimes] = useState({})
const [dataTime, setdataTime] = useState("")
const [hijriDate, setHijriDate] = useState(null)

const [cityQuery, setCityQuery] = useState("Cairo")
const [countryQuery, setCountryQuery] = useState("Egypt")
const method = 5

const [isLoading, setIsLoading] = useState(true)
const [errorMsg, setErrorMsg] = useState("")

const [coords, setCoords] = useState(null)
const [locationMode, setLocationMode] = useState("manual")

const [countdown, setCountdown] = useState("")

const [notifPermission, setNotifPermission] = useState(
  typeof Notification !== "undefined" ? Notification.permission : "unsupported"
)
const notifiedRef = useRef(new Set())

const [qibla, setQibla] = useState(null)
const [compassEnabled, setCompassEnabled] = useState(false)
const [heading, setHeading] = useState(null)

const [showWeek, setShowWeek] = useState(false)
const [weekData, setWeekData] = useState([])
const [weekLoading, setWeekLoading] = useState(false)

const [shareMsg, setShareMsg] = useState("")
const [dhikrText, setDhikrText] = useState("")

useEffect(() => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      setLocationMode("auto")
    },
    () => {}
  )
}, [])

useEffect(() => {
  const fetchPrayerTimes = async () => {
    const usingCoords = locationMode === "auto" && coords
    if (!usingCoords && (!cityQuery.trim() || !countryQuery.trim())) {
      setErrorMsg(t.loadError)
      return
    }
    setIsLoading(true)
    setErrorMsg("")
    try {
      const url = usingCoords
        ? `https://api.aladhan.com/v1/timings?latitude=${coords.lat}&longitude=${coords.lon}&method=${method}`
        : `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityQuery)}&country=${encodeURIComponent(countryQuery)}&method=${method}`
      const response = await fetch(url)
      const data_Prayer = await response.json()
      if (!response.ok || !data_Prayer?.data?.timings) {
        throw new Error("invalid response")
      }
      setPrayerTimes(data_Prayer.data.timings)
      setdataTime(data_Prayer.data.date.gregorian.date)
      setHijriDate({
        day: data_Prayer.data.date.hijri.day,
        year: data_Prayer.data.date.hijri.year,
        monthAr: data_Prayer.data.date.hijri.month.ar,
        monthEn: data_Prayer.data.date.hijri.month.en,
      })
    } catch (error) {
      console.error(error)
      setErrorMsg(t.loadError)
    } finally {
      setIsLoading(false)
    }
  }
  fetchPrayerTimes()
}, [cityQuery, countryQuery, method, locationMode, coords])

useEffect(() => {
  const known = findCity(cityQuery)
  const lat = (locationMode === "auto" && coords) ? coords.lat : known?.lat
  const lon = (locationMode === "auto" && coords) ? coords.lon : known?.lon
  if (!lat || !lon) {
    setQibla(null)
    return
  }
  fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`)
    .then(res => res.json())
    .then(data => setQibla(data.data.direction))
    .catch(() => setQibla(null))
}, [cityQuery, locationMode, coords])

const enableCompass = async () => {
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const perm = await DeviceOrientationEvent.requestPermission()
      if (perm === "granted") {
        setCompassEnabled(true)
      } else {
        setErrorMsg(t.compassPermError)
      }
    } catch (error) {
      setErrorMsg(t.compassUnsupported)
    }
  } else if (typeof DeviceOrientationEvent !== "undefined") {
    setCompassEnabled(true)
  } else {
    setErrorMsg(t.compassNotSupportedBrowser)
  }
}

useEffect(() => {
  if (!compassEnabled) return
  const handleOrientation = (event) => {
    let h
    if (typeof event.webkitCompassHeading !== "undefined") {
      h = event.webkitCompassHeading
    } else if (event.alpha !== null) {
      h = 360 - event.alpha
    }
    if (h !== undefined) setHeading(h)
  }
  window.addEventListener("deviceorientationabsolute", handleOrientation, true)
  window.addEventListener("deviceorientation", handleOrientation, true)
  return () => {
    window.removeEventListener("deviceorientationabsolute", handleOrientation, true)
    window.removeEventListener("deviceorientation", handleOrientation, true)
  }
}, [compassEnabled])

const formatTimes = (time) => {
  if (!time) {
    return "00:00"
  }
  let [hours, minutes] = time.slice(0, 5).split(":").map(Number)
  const perd = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
}

const getNextPrayerKey = () => {
  if (!prayerTimes.Fajr) return null
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  for (const key of prayerOrder) {
    if (toMinutes(prayerTimes[key]) > currentMinutes) {
      return key
    }
  }
  return prayerOrder[0]
}

const nextPrayerKey = getNextPrayerKey()

const getPrayerStatus = (key) => {
  if (!prayerTimes[key]) return "upcoming"
  if (key === nextPrayerKey) return "active"
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  return currentMinutes >= toMinutes(prayerTimes[key]) ? "past" : "upcoming"
}

const getPhase = () => {
  if (!prayerTimes.Fajr) return "day"
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  const fajr = toMinutes(prayerTimes.Fajr)
  const dhuhr = toMinutes(prayerTimes.Dhuhr)
  const asr = toMinutes(prayerTimes.Asr)
  const maghrib = toMinutes(prayerTimes.Maghrib)
  const isha = toMinutes(prayerTimes.Isha)
  if (cur < fajr || cur >= isha) return "night"
  if (cur < dhuhr) return "fajr"
  if (cur < asr) return "day"
  if (cur < maghrib) return "asr"
  return "maghrib"
}

const phase = getPhase()

const getLastPassedPrayer = () => {
  if (!prayerTimes.Fajr) return null
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  let last = null
  for (const key of prayerOrder) {
    if (toMinutes(prayerTimes[key]) <= cur) last = key
  }
  return last || "Isha"
}
const lastPassedPrayer = getLastPassedPrayer()

useEffect(() => {
  if (!lastPassedPrayer) return
  const options = adhkarAfterPrayer[lastPassedPrayer][lang]
  setDhikrText(options[Math.floor(Math.random() * options.length)])
}, [lastPassedPrayer, lang])

useEffect(() => {
  const timer = setInterval(() => {
    if (!prayerTimes.Fajr || !nextPrayerKey) return
    const now = new Date()
    const [h, m] = prayerTimes[nextPrayerKey].slice(0, 5).split(":").map(Number)
    const target = new Date(now)
    target.setHours(h, m, 0, 0)
    if (target <= now) target.setDate(target.getDate() + 1)
    const diff = target - now
    const hh = String(Math.floor(diff / 3600000)).padStart(2, "0")
    const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0")
    const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")
    setCountdown(`${hh}:${mm}:${ss}`)
  }, 1000)
  return () => clearInterval(timer)
}, [prayerTimes, nextPrayerKey])

const requestNotifications = async () => {
  if (typeof Notification === "undefined") return
  const perm = await Notification.requestPermission()
  setNotifPermission(perm)
}

useEffect(() => {
  if (notifPermission !== "granted" || !prayerTimes.Fajr) return
  const check = setInterval(() => {
    const now = new Date()
    const cur = now.getHours() * 60 + now.getMinutes()
    prayerOrder.forEach((key) => {
      const diff = toMinutes(prayerTimes[key]) - cur
      const notifyId = `${key}-${now.toDateString()}`
      if (diff === 10 && !notifiedRef.current.has(notifyId)) {
        new Notification(t.notifTitle, { body: t.notifBody(prayerLabels[lang][key]) })
        notifiedRef.current.add(notifyId)
      }
    })
  }, 30000)
  return () => clearInterval(check)
}, [notifPermission, prayerTimes, lang])

useEffect(() => {
  setWeekData([])
}, [cityQuery, countryQuery, method])

const toggleWeek = async () => {
  if (showWeek) { setShowWeek(false); return }
  if (!cityQuery.trim() || !countryQuery.trim()) return
  setShowWeek(true)
  if (weekData.length) return
  setWeekLoading(true)
  try {
    const now = new Date()
    const res = await fetch(`https://api.aladhan.com/v1/calendarByCity?city=${encodeURIComponent(cityQuery)}&country=${encodeURIComponent(countryQuery)}&method=${method}&month=${now.getMonth() + 1}&year=${now.getFullYear()}`)
    const data = await res.json()
    if (!res.ok || !Array.isArray(data?.data)) {
      throw new Error("invalid response")
    }
    const todayIndex = now.getDate() - 1
    setWeekData(data.data.slice(todayIndex, todayIndex + 7))
  } catch (error) {
    console.error(error)
  } finally {
    setWeekLoading(false)
  }
}

const shareToday = async () => {
  const labels = prayerLabels[lang]
  const text_ = `${labels.Fajr} ${formatTimes(prayerTimes.Fajr)}\n${labels.Dhuhr} ${formatTimes(prayerTimes.Dhuhr)}\n${labels.Asr} ${formatTimes(prayerTimes.Asr)}\n${labels.Maghrib} ${formatTimes(prayerTimes.Maghrib)}\n${labels.Isha} ${formatTimes(prayerTimes.Isha)}`
  if (navigator.share) {
    try { await navigator.share({ title: t.shareToday, text: text_ }) } catch (error) {}
  } else {
    try {
      await navigator.clipboard.writeText(text_)
      setShareMsg(t.shareCopied)
      setTimeout(() => setShareMsg(""), 2000)
    } catch (error) {
      console.error(error)
    }
  }
}

const useMyLocation = () => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      setLocationMode("auto")
    },
    () => setErrorMsg(t.geoError)
  )
}

const handleCityChange = (value) => {
  setLocationMode("manual")
  setCityQuery(value)
  const known = findCity(value)
  if (known) setCountryQuery(known.country)
}

  return (
  <section dir={lang === "ar" ? "rtl" : "ltr"} className={`lang-${lang}`} style={{ background: phaseBackground[phase] }}>
    <div className="container">
      <div className="lang-toggle">
        <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>

      <div className="top-sec">
        <CitySelector
          lang={lang}
          cityQuery={cityQuery}
          countryQuery={countryQuery}
          locationMode={locationMode}
          onCityChange={handleCityChange}
          onCountryChange={setCountryQuery}
          onUseLocation={useMyLocation}
          t={t}
        />
        <div className="date">
          <h3>{t.dateLabel}</h3>
          <h4>{dataTime}</h4>
          {hijriDate && (
            <p className="hijri">
              {hijriDate.day} {lang === "ar" ? hijriDate.monthAr : hijriDate.monthEn} {hijriDate.year} {t.hijriSuffix}
            </p>
          )}
        </div>
      </div>

      {nextPrayerKey && (
        <Countdown label={t.remainingFor(prayerLabels[lang][nextPrayerKey])} value={countdown} />
      )}

      <Prayer name={prayerLabels[lang].Fajr} time={formatTimes(prayerTimes.Fajr)} status={getPrayerStatus("Fajr")} />
      <Prayer name={prayerLabels[lang].Dhuhr} time={formatTimes(prayerTimes.Dhuhr)} status={getPrayerStatus("Dhuhr")} />
      <Prayer name={prayerLabels[lang].Asr} time={formatTimes(prayerTimes.Asr)} status={getPrayerStatus("Asr")} />
      <Prayer name={prayerLabels[lang].Maghrib} time={formatTimes(prayerTimes.Maghrib)} status={getPrayerStatus("Maghrib")} />
      <Prayer name={prayerLabels[lang].Isha} time={formatTimes(prayerTimes.Isha)} status={getPrayerStatus("Isha")} />

      {isLoading && <p className="status-msg">{t.loading}</p>}
      {!isLoading && errorMsg && <p className="status-msg error">{errorMsg}</p>}

      {lastPassedPrayer && (
        <div className="adhkar-box">
          <p>{dhikrText}</p>
        </div>
      )}

      <QiblaCompass
        qibla={qibla}
        heading={heading}
        compassEnabled={compassEnabled}
        onEnableCompass={enableCompass}
        t={t}
      />

      <ActionsBar
        notifPermission={notifPermission}
        onEnableNotif={requestNotifications}
        showWeek={showWeek}
        onToggleWeek={toggleWeek}
        onShare={shareToday}
        t={t}
      />
      {shareMsg && <p className="status-msg">{shareMsg}</p>}

      <WeekView
        show={showWeek}
        loading={weekLoading}
        data={weekData}
        formatTimes={formatTimes}
        t={t}
      />
    </div>
  </section>
  )
}

export default App
