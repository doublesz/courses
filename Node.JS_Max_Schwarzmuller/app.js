const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`listening on port ${port}...`);
});
