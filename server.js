import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

// Các route khác của bạn
app.get('/rooms/room-types', (req, res) => {
    // Xử lý yêu cầu
    res.json({ /* dữ liệu trả về */ });
});

app.use(
    '/rooms', // Đường dẫn yêu cầu
    createProxyMiddleware({
        target: 'http://localhost:9192', // URL của máy chủ backend
        changeOrigin: true,
    })
);

app.listen(9192, () => {
    console.log('Server is running on port 9192');
});
