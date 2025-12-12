package com.example.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.autoconfigure.domain.EntityScan

@SpringBootApplication
@EntityScan(basePackages = ["com.example.backend"])
class BackendApplication

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}