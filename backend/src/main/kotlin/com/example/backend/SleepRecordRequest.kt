package com.example.backend

data class SleepRecordRequest(
    val date: String,
    val sleepTime: String,
    val wakeTime: String
)
