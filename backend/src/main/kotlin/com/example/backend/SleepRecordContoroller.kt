package com.example.backend

import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.CrossOrigin // CrossOriginをインポート

@RestController
@RequestMapping("/api/sleep")
// ★ 重要な変更点: フロントエンドのオリジン(Viteのデフォルト)を明示的に許可
@CrossOrigin(origins = ["http://localhost:5173"])
class SleepRecordController(
    private val service: SleepRecordService // サービス層は実装済みの想定
) {

    @PostMapping
    fun create(@RequestBody req: SleepRecordRequest): SleepRecordResponse {
        // 実際にはここでバリデーションやデータの保存処理を行う
        println("Received POST request: $req")
        return service.createRecord(req)
    }

    @GetMapping
    fun getAll(): List<SleepRecordResponse> {
        // 実際にはデータベースから全レコードを取得する
        println("Received GET all request")
        return service.getAll()
    }

    @GetMapping("/weekly")
    fun getWeekly(): List<SleepRecordResponse> {
        // 実際には直近一週間のレコードを取得する
        println("Received GET weekly request")
        return service.getWeeklyRecords()
    }
}

// データクラスは省略
// data class SleepRecordRequest(...)
// data class SleepRecordResponse(...)
// class SleepRecordService(...)