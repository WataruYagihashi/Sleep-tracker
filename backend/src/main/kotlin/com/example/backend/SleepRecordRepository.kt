package com.example.backend

import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate

interface SleepRecordRepository : JpaRepository<SleepRecord, Long> {

    fun findAllByDateBetween(start: LocalDate, end: LocalDate): List<SleepRecord>
}
