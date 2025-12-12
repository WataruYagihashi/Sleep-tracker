import React from "react";

export default function TodaySleep({ setPage, latestRecord, onDelete }) {

    const handleLocalDelete = () => {
        if (latestRecord && latestRecord.id) {
            onDelete(latestRecord.id);
        } else {
            alert("削除対象の記録が見つかりません。");
        }
    };

    const formatSleepHours = (hours) => {
        if (typeof hours !== 'number' || hours <= 0) {
            return "--h--m";
        }
        const h = Math.floor(hours);
        const m = Math.round((hours % 1) * 60);
        return `${h}h ${m}m`;
    };

    return (
        <div>
            <h2>今日の睡眠</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid",
                    alignItems: "center",
                    width: "400px",
                    borderRadius: "20px",
                    padding: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#f0f8ff",
                }}
            >
                <div style={{ width: "100%" }}>
                    <h3>就寝時間</h3>
                    <h2>{latestRecord ? latestRecord.sleepTime : "-- : --"}</h2>
                </div>

                <div style={{ width: "100%" }}>
                    <h3>起床時間</h3>
                    <h2>{latestRecord ? latestRecord.wakeTime : "-- : --"}</h2>
                </div>

                <div style={{ width: "100%" }}>
                    <h3>睡眠時間</h3>
                    <h2>
                        {formatSleepHours(latestRecord?.sleepHours)}
                    </h2>
                </div>
            </div>


            <button
                style={{
                    width: "80%",
                    color: "#ffffff",
                    backgroundColor: "#1e90ff",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                }}
                onClick={() => setPage("form")}
            >
                + 睡眠を記録する
            </button>

            {latestRecord && (
                <button
                    onClick={handleLocalDelete}
                    style={{
                        width: "80%",
                        backgroundColor: "#dc3545",
                        color: "white",
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    最新の記録を削除
                </button>
            )}
        </div>
    );
}