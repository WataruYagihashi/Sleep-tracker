import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./App.css";
import TodaySleep from "./component/TodaySleep.jsx";
import AverageSleepTime from "./component/AverageSleepTime.jsx";
import SleepManagement from "./component/SleepManagement.jsx";
import WeeklySleepChart from "./component/WeeklySleepChart.jsx";

function App() {
    const [page, setPage] = useState("home");
    const [sleepRecords, setSleepRecords] = useState([]);
    // ★ 修正 1-A: weeklyRecords のステートを追加
    const [weeklyRecords, setWeeklyRecords] = useState([]);

    // 全レコード取得関数
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

    // ★ 修正 1-B: 週次データ取得関数を追加 (Controllerで /api/sleep/weekly を実装済みの前提)
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


    // 初期ロード時に両方のデータを取得
    useEffect(() => {
        fetchRecords();
        fetchWeeklyRecords(); // ★ 週次データの取得も実行
    }, [fetchRecords, fetchWeeklyRecords]);


    // 今週の平均睡眠時間を計算
    const weeklyAverage = useMemo(() => {
        // 平均計算は全レコードではなく、weeklyRecordsに対して行う方がより正確
        if (weeklyRecords.length === 0) return 0;
        const total = weeklyRecords.reduce((sum, r) => sum + r.sleepHours, 0);
        return (total / weeklyRecords.length).toFixed(2);
    }, [weeklyRecords]); // ★ 修正: weeklyRecords に依存させる


    // 最新の記録を取得 (全レコードから)
    const latestRecord = useMemo(() => {
        return sleepRecords.length > 0 ? sleepRecords[sleepRecords.length - 1] : null;
    }, [sleepRecords]);


    // データ更新後のコールバック関数
    // POST成功時に全データと週次データを両方再取得
    const onRecordSuccessHandler = useCallback(() => {
        fetchRecords();
        fetchWeeklyRecords();
    }, [fetchRecords, fetchWeeklyRecords]);


    return (
        <div>
            {page === "home" && (
                <div>
                    <h1>🌕️睡眠トラッカー💤</h1>

                    <div style={{ display: "flex", width: "1000px", gap: "100px" }}>
                        {/* ★ 修正 2-A: 1列目: 今日の睡眠 */}
                        <div style={{ width: "100%" }}>
                            <TodaySleep
                                setPage={setPage}
                                latestRecord={latestRecord}
                            />
                        </div>

                        {/* ★ 修正 2-B: 2列目: 平均時間とグラフ */}
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
                    // ★ 修正: POST成功時に両方のデータを再取得するハンドラを渡す
                    onRecordSuccess={onRecordSuccessHandler}
                />
            )}
        </div>
    );
}

export default App;