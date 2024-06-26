require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/task.routes');
const app = express();
const cors = require('cors');
const authenticate = require('./middleware/auth');


const corsOptions = {
  origin: process.env.MAIN_API_ORIGIN_URL,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticate);
app.use('/task-api/tasks', taskRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Task API is running on port ${PORT}`);
});
