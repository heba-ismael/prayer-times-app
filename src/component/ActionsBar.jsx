function ActionsBar({ notifPermission, onEnableNotif, showWeek, onToggleWeek, onShare, t }) {
  return (
    <div className="actions-row">
      {notifPermission !== "granted" && notifPermission !== "unsupported" && (
        <button type="button" onClick={onEnableNotif}>{t.enableNotif}</button>
      )}
      <button type="button" onClick={onToggleWeek}>{showWeek ? t.hideWeek : t.showWeek}</button>
      <button type="button" onClick={onShare}>{t.shareToday}</button>
    </div>
  )
}

export default ActionsBar
