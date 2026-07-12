function Countdown({ label, value }) {
  return (
    <div className="countdown-box">
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  )
}

export default Countdown
