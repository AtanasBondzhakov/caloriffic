import { number, object, string } from "yup";

const transformNum = value => (isNaN(value) ? undefined : value)

export const bodyMetricsSchema = object().shape({
    'gender': string().typeError('Gender is required.').required(),
    'age': number().typeError('Age is required.').min(10, 'Age cannot be less than 10').required(),
    'weight': number().typeError('Weight is required.').min(30, 'Weight cannot be less than 30').required(),
    'height': number().typeError('Height is required.').min(130, 'Height cannot be less than 130').required(),
    'neck': number().typeError('Neck is required.').min(20, 'Neck cannot be less than 20').required(),
    'abdomen': number().transform(transformNum).when('gender', {
        is: 'male',
        then: (schema) => schema.min(40, 'Abdomen cannot be less than 40').required('Abdomen is required.'),
        // otherwise: (schema) => schema.notRequired()
    }),
    'waist': number().transform(transformNum).when('gender', {
        is: 'female',
        then: (schema) => schema.min(30, 'Waist cannot be less than 30').required('Waist is required.'),
        // otherwise: (schema) => schema.notRequired()
    }),
    'hip': number().transform(transformNum).when('gender', {
        is: 'female',
        then: (schema) => schema.min(40, 'Hip cannot be less than 40').required('Hip is required.'),
        // otherwise: number().notRequired()
    }),
    'activity': string()
        .required('Activity is required')
        .notOneOf([''], 'Please select activity.'),
    'calorieIntake': string()
        .required('Calorie Intake is required')
        .notOneOf([''], 'Please select calorie intake.'),
})