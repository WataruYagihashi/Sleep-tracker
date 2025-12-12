package com.example.backend

import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity // ResponseEntityをインポート

@RestController
@RequestMapping("/api/sleep")
@CrossOrigin(origins = ["http://localhost:5173"])
class SleepRecordController(
    private val service: SleepRecordService
) {

    @PostMapping
    fun create(@RequestBody req: SleepRecordRequest): SleepRecordResponse {
        println("Received POST request: $req")
        return service.createRecord(req)
    }

    @GetMapping
    fun getAll(): List<SleepRecordResponse> {
        println("Received GET all request")
        return service.getAll()
    }

    @GetMapping("/weekly")
    fun getWeekly(): List<SleepRecordResponse> {
        println("Received GET weekly request")
        return service.getWeeklyRecords()
    }

    @DeleteMapping("/{id}")
    fun deleteRecord(@PathVariable id: Long): ResponseEntity<Void> {
        println("Received DELETE request for ID: $id")
        service.deleteRecordById(id)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/reset")
    fun resetData(): ResponseEntity<Void> {
        println("Received DELETE reset request")
        service.deleteAllRecords()
        return ResponseEntity.noContent().build()
    }
}