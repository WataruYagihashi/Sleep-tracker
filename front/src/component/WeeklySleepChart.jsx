import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const transformData = (records) => {

    const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = sortedRecords.map(r =>
        new Date(r.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
    );

    const dataValues = sortedRecords.map(r => parseFloat(r.sleepHours.toFixed(1)));

    return { labels, dataValues };
};

export default function WeeklySleepChart({ weeklyRecords }) {

    const { labels, dataValues } = useMemo(() => transformData(weeklyRecords), [weeklyRecords]);

    if (dataValues.length === 0) {
        return <p>今週の記録がありません。</p>;
    }

    return (
        <Card sx={{ mt: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    今週の睡眠時間 ({dataValues.length}日分)
                </Typography>

                <Box sx={{ width: '100%', height: 300 }}>
                    <BarChart
                        xAxis={[{
                            scaleType: 'band',
                            data: labels,
                            label: '日付',
                            id: 'days'
                        }]}
                        yAxis={[{
                            label: '睡眠時間 (h)'
                        }]}
                        series={[
                            {
                                data: dataValues,
                                label: '睡眠時間',
                                color: '#1e90ff',
                            },
                        ]}
                        width={600}
                        height={250}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}