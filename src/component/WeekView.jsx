function WeekView({ show, loading, data, formatTimes, t }) {
  if (!show) return null

  return (
    <div className="week-table">
      {loading && <p className="status-msg">{t.weekLoading}</p>}
      {!loading && data.map((day, index) => (
        <div className="week-row" key={index}>
          <span className="week-date">{day.date.gregorian.date}</span>
          <span>{formatTimes(day.timings.Fajr)}</span>
          <span>{formatTimes(day.timings.Dhuhr)}</span>
          <span>{formatTimes(day.timings.Asr)}</span>
          <span>{formatTimes(day.timings.Maghrib)}</span>
          <span>{formatTimes(day.timings.Isha)}</span>
        </div>
      ))}
    </div>
  )
}

export default WeekView
