export const bmiCalculate = (gender, height, neck, abdomen, waist, hip) => {
    const heightInch = height / 2.54;
    const neckInch = neck / 2.54;

    if (gender === 'male') {
        const abdomenInch = abdomen / 2.54;
        const result = 86.010 * Math.log10(abdomenInch - neckInch) - 70.041 * Math.log10(heightInch) + 36.76;

        return result;
    }

    const waistInch = waist / 2.54;
    const hipInch = hip / 2.54;
    const result = 163.205 * Math.log10(waistInch + hipInch - neckInch) - 97.684 * Math.log10(heightInch) - 78.387;

    return result;
};

export const bodyFatsKgCalculate = (weight, bodyFatsPercent) => {
    return weight * (bodyFatsPercent / 100);
};

export const lbmCalculate = (weight, bmi) => {
    return  weight * (1 - bmi / 100);
};

export const bmrCalculate = (gender, weight, height, age) => {
    if (gender === 'male') {
        const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        return bmr;
    }

    const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    return bmr;
};

export const dailyCaloriesCalculate = (bmr, activity) => {
    const activityTable = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    return bmr * activityTable[activity];
};