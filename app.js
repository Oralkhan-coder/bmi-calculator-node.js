const express = require('express');
const path = require('path');
const bmiService = require('./service/bmiService');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/calculate-bmi', (req, res, next) => {
    try {
        const weight = parseFloat(req.body.weight);
        const height = parseFloat(req.body.height);

        const bmi = bmiService.calculateBMI(weight, height);

        if (bmi === null) {
            throw new Error('Invalid input. Please enter positive numbers.');
        }

        const { name: categoryName, class: categoryClass } = bmiService.getBMICategory(bmi);

        res.render('result', {
            bmi: bmi.toFixed(2),
            category: categoryName,
            categoryClass: categoryClass
        });
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: err.message });
});

app.listen(port, () => {
    console.log(`BMI Calculator app listening at http://localhost:${port}`);
});
