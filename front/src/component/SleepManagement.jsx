import React, { useState } from "react";

export default function SleepManagement({setPage, onRecordSuccess}) {
    const [date, setDate] = useState(new Date());
    const [sleepTime, setSleepTime] = useState("23:00");
    const [wakeTime, setWakeTime] = useState("07:00");

    const calcSleepHours = (sleep, wake) => {
        const [sh, sm] = sleep.split(":").map(Number);
        const [wh, wm] = wake.split(":").map(Number);

        const sleepDate = new Date(date);
        sleepDate.setHours(sh, sm);

        const wakeDate = new Date(date);
        wakeDate.setHours(wh, wm);

        if (wakeDate <= sleepDate) wakeDate.setDate(wakeDate.getDate() + 1);

        return (wakeDate - sleepDate) / (1000 * 60 * 60);
    };

    const handleRegister = async () => {
        const record = {
            date: date.toISOString().slice(0, 10),
            sleepTime,
            wakeTime
        };

        // ★ バックエンドへ送信（POST）
        const response = await fetch("/api/sleep", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record)
        });

        if (response.ok) {
            if (onRecordSuccess) {
                await onRecordSuccess();
            }
        setPage("home");
        }

    };

    return (
        <main className="container-fluid">
            {/* 日付入力 */}
            <div className="form-group">
                <label style={{ fontSize: "45px" }}>今日の日付 : </label>
                <input
                    type="date"
                    value={date.toISOString().slice(0, 10)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    style={{ fontSize: "25px" }}
                />
            </div>

            {/* 就寝時間 */}
            <div className="sleep-time">
                <span style={{ fontSize: "50px" }}>就寝時間 : </span>
                <input
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    style={{ fontSize: "50px" }}
                />
            </div>

            {/* 起床時間 */}
            <div className="wake-up-time">
                <span style={{ fontSize: "50px" }}>起床時間 : </span>
                <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    style={{ fontSize: "50px" }}
                />
            </div>

            <button onClick={handleRegister}>登録</button>
            <button onClick={() => setPage("home")}>閉じる</button>
        </main>
    );
}
