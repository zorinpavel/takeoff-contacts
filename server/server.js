const express = require('express');
const app = require('./app');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './views');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.get('/help', (req, res) => {
    res.render('help', {});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.all((req, res) => {
    res.status(404);
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
