package com.example.backend

data class SleepRecordResponse(
    val id: Long,
    val date: String,
    val sleepTime: String,
    val wakeTime: String,
    val sleepHours: Double
)
