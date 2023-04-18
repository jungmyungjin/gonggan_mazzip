import 'dotenv/config';
import { app } from './src/app';
import path from 'path';

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'src', 'views', 'main', 'main.html'));
});

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});