export const bmiCalculate = (gender, height, neck, abdomen, waist, hip) => {
    const heightInch = height / 2.54;
    const neckInch = neck / 2.54;

    if (gender === 'male') {
        const abdomenInch = abdomen / 2.54;
        const result = 86.010 * Math.log10(abdomenInch - neckInch) - 70.041 * Math.log10(heightInch) + 36.76;

        return Math.round(result);
    }

    const waistInch = waist / 2.54;
    const hipInch = hip / 2.54;
    const result = 163.205 * Math.log10(waistInch + hipInch - neckInch) - 97.684 * Math.log10(heightInch) - 78.387;

    return Math.round(result);
};

