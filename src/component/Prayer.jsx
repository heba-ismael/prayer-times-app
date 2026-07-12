function Prayer({ name, time, status }) {
  return (
    <div className={`prayer${status ? " " + status : ""}`}>
      <p className="name-prayer">{name}</p>
      <p className="time-prayer">{time}</p>
    </div>
  )
}

export default Prayer
