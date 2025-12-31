const express = require('express');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.static('../frontend'));

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
