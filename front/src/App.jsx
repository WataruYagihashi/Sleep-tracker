import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./App.css";
import TodaySleep from "./component/TodaySleep.jsx";
import AverageSleepTime from "./component/AverageSleepTime.jsx";
import SleepManagement from "./component/SleepManagement.jsx";
import WeeklySleepChart from "./component/WeeklySleepChart.jsx";

function App() {
    const [page, setPage] = useState("home");
    const [sleepRecords, setSleepRecords] = useState([]);
    const [weeklyRecords, setWeeklyRecords] = useState([]);

    const fetchRecords = useCallback(async () => {
        try {
            const res = await fetch("/api/sleep");
            if (!res.ok) throw new Error("Failed to fetch sleep records");
            const data = await res.json();
            setSleepRecords(data);
        } catch (error) {
            console.error("全データの読み込み中にエラーが発生しました", error);
        }
    }, []);

    const fetchWeeklyRecords = useCallback(async () => {
        try {
            const res = await fetch("/api/sleep/weekly");
            if (!res.ok) throw new Error("Failed to fetch weekly records");
            const data = await res.json();
            setWeeklyRecords(data);
        } catch (error) {
            console.error("週次データの読み込み中にエラーが発生しました", error);
        }
    }, []);


    useEffect(() => {
        fetchRecords();
        fetchWeeklyRecords();
    }, [fetchRecords, fetchWeeklyRecords]);


    const onRecordSuccessHandler = useCallback(() => {
        fetchRecords();
        fetchWeeklyRecords();
    }, [fetchRecords, fetchWeeklyRecords]);


    const handleDeleteRecord = useCallback(async (id) => {
        if (!window.confirm(`ID ${id} の記録を削除してもよろしいですか？`)) {
            return;
        }

        try {
            const response = await fetch(`/api/sleep/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                alert('記録が削除されました。');
                onRecordSuccessHandler();
            } else {
                alert(`削除に失敗しました: ${response.status}`);
            }
        } catch (error) {
            console.error("削除中の通信エラー:", error);
            alert("通信エラーが発生しました。");
        }
    }, [onRecordSuccessHandler]);


    const handleReset = async () => {
        if (!window.confirm("本当にすべての睡眠記録を削除してもよろしいですか？")) {
            return;
        }

        try {
            const response = await fetch("/api/sleep/reset", {
                method: "DELETE",
            });

            if (response.status === 204) {
                alert("すべてのデータが正常にリセットされました。");
                setSleepRecords([]);
                setWeeklyRecords([]);
                onRecordSuccessHandler();
            } else {
                alert(`データリセットに失敗しました: ${response.status}`);
            }
        } catch (error) {
            console.error("リセット中の通信エラー:", error);
            alert("データリセット中にエラーが発生しました。");
        }
    };


    const weeklyAverage = useMemo(() => {
        if (weeklyRecords.length === 0) return 0;
        const total = weeklyRecords.reduce((sum, r) => sum + r.sleepHours, 0);
        return (total / weeklyRecords.length).toFixed(2);
    }, [weeklyRecords]);


    const latestRecord = useMemo(() => {
        return sleepRecords.length > 0 ? sleepRecords[sleepRecords.length - 1] : null;
    }, [sleepRecords]);


    return (
        <div>
            {page === "home" && (
                <div>
                    <h1>🛏️睡眠トラッカー💤</h1>

                    <button
                        onClick={handleReset}
                        style={{ position: 'absolute', top: 10, right: 10, background: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        全データ削除 (リセット)
                    </button>

                    <div style={{ display: "flex", width: "1000px", gap: "100px" }}>
                        <div style={{ width: "100%" }}>
                            <TodaySleep
                                setPage={setPage}
                                latestRecord={latestRecord}
                                onDelete={handleDeleteRecord}
                            />
                        </div>

                        <div style={{ width: "100%" }}>
                            <AverageSleepTime average={weeklyAverage} />
                            <WeeklySleepChart weeklyRecords={weeklyRecords} />
                        </div>
                    </div>
                </div>
            )}

            {page === "form" && (
                <SleepManagement
                    setPage={setPage}
                    onRecordSuccess={onRecordSuccessHandler}
                />
            )}
        </div>
    );
}

export default App;