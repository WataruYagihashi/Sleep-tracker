package com.example.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.autoconfigure.domain.EntityScan

@SpringBootApplication
// ★ 修正点: エンティティが実際にあるパッケージを指定
@EntityScan(basePackages = ["com.example.backend"])
// または、このアノテーションを完全に削除してもOKです。
// なぜなら、SleepRecordがメインクラスと同じ com.example.backend のサブパッケージにあるとSpring Bootは自動でスキャンするからです。
class BackendApplication

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}