
const express = require('express'); // sử dụng Express để xây dựng máy chủ web
const app = express(); // khởi tạo ứng dụng Express
const port = 3000; // chọn cổng 3000 cho máy chủ

app.use(express.json()); // cho phép nhận dữ liệu JSON từ yêu cầu HTTP

// tạo danh sách các công việc tạm thời được lưu trữ trong bộ nhớ
let todos = [
    { id: 1, task: "Học Node.js", completed: false },
    { id: 2, task: "Xây dựng API với Express", completed: false }
];

// Định nghĩa các API cho ứng dụng

// API 1: Lấy tất cả công việc
app.get('/todos', (req, res) => {
    res.json(todos); // trả về danh sách công việc dưới dạng JSON
});

// API 2: Thêm công việc mới
app.post('/todos', (req, res) => {
    const { task } = req.body; // lấy giá trị 'task' từ nội dung yêu cầu
    if (!task) {
        return res.status(400).json({ message: "Task là bắt buộc" });//Gửi phản hồi với mã trạng thái HTTP là 400 (Bad Request) kèm theo thông báo lỗi dưới dạng JSON nếu task không có giá trị. 
    }

    const newTodo = {
        id: todos.length + 1, // tự động tạo ID mới
        task: task, // tên công việc
        completed: false // trạng thái hoàn thành ban đầu là false
    };
    todos.push(newTodo); // thêm công việc mới vào danh sách
    res.status(201).json(newTodo); //  Gửi phản hồi với mã trạng thái 201 (Created) và nội dung là công việc vừa thêm.
});

// API 3: Cập nhật trạng thái hoàn thành của công việc
// Gửi yêu cầu PUT tới '/todos/:id' để cập nhật trạng thái hoàn thành của công việc
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id); // lấy ID công việc từ URL
    const { completed } = req.body; // lấy trạng thái 'completed' từ nội dung yêu cầu

    const todo = todos.find(t => t.id === todoId); // tìm công việc có ID tương ứng
    if (!todo) {
        return res.status(404).json({ message: "Không tìm thấy công việc" }); //Trả về mã trạng thái HTTP 404 (Not Found) nếu không tìm thấy công việc.
    }

    todo.completed = completed; // cập nhật trạng thái hoàn thành của công việc
    res.json(todo); // trả về công việc đã cập nhật
});

// API 4: Xóa công việc
// Gửi yêu cầu DELETE tới '/todos/:id' để xóa công việc
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id); // lấy ID công việc từ URL
    const todoIndex = todos.findIndex(t => t.id === todoId); // tìm vị trí của công việc trong danh sách

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Không tìm thấy công việc" });//Trả về mã trạng thái HTTP 404 (Not Found) nếu không tìm thấy công việc.
    }

    const deletedTodo = todos.splice(todoIndex, 1); // xóa công việc khỏi danh sách
    res.json(deletedTodo); // trả về công việc đã xóa
});

// Lắng nghe kết nối từ cổng đã chọn
app.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});
