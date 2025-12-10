const express = require('express');
const path = require('path');
const fs = require('fs');
const bmiService = require('./service/bmiService');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const templatePath = path.join(__dirname, 'templates', 'form.html');
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading form template:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    const bmi = bmiService.calculateBMI(weight, height);

    if (bmi === null) {
        return res.send('Invalid input. Please enter positive numbers.');
    }

    const { name: categoryName, class: categoryClass } = bmiService.getBMICategory(bmi);

    const templatePath = path.join(__dirname, 'templates', 'result.html');
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading result template:', err);
            return res.status(500).send('Internal Server Error');
        }

        const html = data
            .replace('{{BMI}}', bmi.toFixed(2))
            .replace('{{CATEGORY}}', categoryName)
            .replaceAll('{{CLASS}}', categoryClass);

        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`BMI Calculator app listening at http://localhost:${port}`);
});
