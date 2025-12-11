package com.example.backend

import jakarta.persistence.*
import java.time.*

@Entity
data class SleepRecord(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val date: LocalDate,

    val sleepTime: LocalTime,

    val wakeTime: LocalTime,

    val sleepHours: Double
)
