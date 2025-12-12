# 🛏️睡眠トラッカーアプリ

React (Vite/MUI) と Kotlin (Spring Boot) を使用して開発された、
睡眠記録と分析を行うフルスタックアプリケーションです!!

## 🚀1.プロジェクトの概要
### 主な機能
* **データ登録 (POST):** 就寝時間と起床時間に基づき、睡眠時間を計算し記録。
* **データ閲覧 (GET):** 最新の記録、全記録、直近7日分の記録を取得
* **データ削除 (DELETE):** 特定の記録の削除及び、全データの完全リセット機能


## ⚒️2.技術
### フロントエンド
* React
* Vite
* MUI

### バックエンド
* Kotlin
* Spring Boo
* PostgreSQL



## 📦 3. セットアップと実行方法
### 3-1. バックエンド (Kotlin/Spring Boot) のセットアップ

1.  `backend` ディレクトリに移動します。
    ```bash
    cd backend
    ```
2.  Gradleを使用して依存関係をダウンロードし、ビルドします。
    ```bash
    ./gradlew build
    ```
3.  アプリケーションを実行します。
    ```bash
    ./gradlew bootRun
    ```
    (サーバーは通常、`http://localhost:8080` で起動します。)

### 3-2. フロントエンド (React/Vite) のセットアップ

1.  `front` ディレクトリに移動します。
    ```bash
    cd front
    ```
2.  必要な依存関係をインストールします。
    ```bash
    npm install
    ```
3.  開発サーバーを起動します。
    ```bash
    npm run dev
    ```
    (クライアントは通常、`http://localhost:5173` で起動します。)

> **💡 注意:** Viteの設定ファイル (`vite.config.js`) により、フロントエンド (5173) からバックエンド (8080) へのAPIリクエストは自動的にプロキシされます。