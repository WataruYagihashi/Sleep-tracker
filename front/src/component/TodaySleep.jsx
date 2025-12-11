import React from "react";

export default function TodaySleep({ setPage, latestRecord }) {
    return (
        <div>
            <h2>今日の睡眠</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid",
                    alignItems: "center",
                    width: "100%",
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
                        {latestRecord
                            ? `${Math.floor(latestRecord.sleepHours)}h ${Math.round((latestRecord.sleepHours % 1) * 60)}m`
                            : "--h--m"}
                    </h2>
                </div>
            </div>

            <button
                style={{
                    width: "80%",
                    color: "#ffffff",
                    backgroundColor: "#1e90ff",
                    marginBottom: "50px",
                    padding: "10px",
                }}
                onClick={() => setPage("form")}
            >
                + 睡眠を記録する
            </button>
        </div>
    );
}
