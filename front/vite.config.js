import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],

    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // ...Spring BootのURLに転送する
                changeOrigin: true, // ホストヘッダーを変更し、CORS問題を回避しやすくする
                secure: false, // 開発環境なのでSSL証明書の検証をスキップ
                // rewrite: (path) => path.replace(/^\/api/, ''), // 今回は /api を残すため不要
            }
        }
    }
})