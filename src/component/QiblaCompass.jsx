function QiblaCompass({ qibla, heading, compassEnabled, onEnableCompass, t }) {
  if (qibla === null) return null

  return (
    <div className="qibla-box">
      <h3>{t.qiblaTitle}</h3>
      <div className="qibla-compass">
        <span className="qibla-north" style={{ transform: `rotate(${-(heading ?? 0)}deg)` }}>N</span>
        <div className="qibla-arrow" style={{ transform: `rotate(${qibla - (heading ?? 0)}deg)` }}>➤</div>
      </div>
      {compassEnabled ? (
        <p>{t.qiblaLive}</p>
      ) : (
        <>
          <p>{t.qiblaStatic(Math.round(qibla))}</p>
          <button type="button" className="location-btn" onClick={onEnableCompass}>{t.enableCompass}</button>
        </>
      )}
    </div>
  )
}

export default QiblaCompass
