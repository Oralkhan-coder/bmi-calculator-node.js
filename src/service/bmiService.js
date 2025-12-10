
const calculateBMI = (weight, height) => {
    if (!weight || !height || weight <= 0 || height <= 0) {
        return null; 
    }
    return weight / (height * height);
};

const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { name: 'Underweight', class: 'underweight' };
    if (bmi < 24.9) return { name: 'Normal weight', class: 'normal' };
    if (bmi < 29.9) return { name: 'Overweight', class: 'overweight' };
    return { name: 'Obese', class: 'obese' };
};

module.exports = {
    calculateBMI,
    getBMICategory
};
