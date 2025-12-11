import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import ideaRoutes from './routes/ideas';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ideas', ideaRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
    res.send('Startup Validator API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
