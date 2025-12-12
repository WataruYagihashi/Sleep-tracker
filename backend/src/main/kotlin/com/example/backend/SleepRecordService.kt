package com.example.backend

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.*

@Service
class SleepRecordService(
    private val repo: SleepRecordRepository
) {

    fun createRecord(req: SleepRecordRequest): SleepRecordResponse {
        val date = LocalDate.parse(req.date)
        val sleep = LocalTime.parse(req.sleepTime)
        val wake = LocalTime.parse(req.wakeTime)

        var sleepDT = LocalDateTime.of(date, sleep)
        var wakeDT = LocalDateTime.of(date, wake)

        if (wakeDT.isBefore(sleepDT)) {
            wakeDT = wakeDT.plusDays(1)
        }

        val hours = Duration.between(sleepDT, wakeDT).toMinutes() / 60.0

        val record = repo.save(
            SleepRecord(
                date = date,
                sleepTime = sleep,
                wakeTime = wake,
                sleepHours = hours
            )
        )

        return SleepRecordResponse(
            record.id,
            record.date.toString(),
            record.sleepTime.toString(),
            record.wakeTime.toString(),
            record.sleepHours
        )
    }

    fun getAll(): List<SleepRecordResponse> =
        repo.findAll().map {
            SleepRecordResponse(
                it.id, it.date.toString(),
                it.sleepTime.toString(), it.wakeTime.toString(),
                it.sleepHours
            )
        }

    fun getWeeklyRecords(): List<SleepRecordResponse> {
        val end = LocalDate.now()
        val start = end.minusDays(7)

        return repo.findAllByDateBetween(start, end).map {
            SleepRecordResponse(
                it.id, it.date.toString(),
                it.sleepTime.toString(), it.wakeTime.toString(),
                it.sleepHours
            )
        }
    }

    @Transactional
    fun deleteAllRecords() {
        repo.deleteAll()
    }

    @Transactional
    fun deleteRecordById(id: Long) {
        repo.deleteById(id)
    }
}