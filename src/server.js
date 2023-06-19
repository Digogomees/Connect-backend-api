const express = require('express');
const routes = require('./routes');
const path = require('path')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)

// libera a rota de uploads
app.use("/files", express.static(path.resolve(__dirname, '../tmp/uploads')))

app.listen(process.env.PORT || 5555);