import { number, object, string } from "yup";

export const bodyMetricsSchema = object().shape({
    'gender': string().required('Gender is required.'),
    'age': number().min(10, 'Age cannot be less than 10').required('Age is required.'),
    'weight': number().min(30, 'Weight cannot be less than 30').required('Weight is required.'),
    'height': number().min(130, 'Height cannot be less than 130').required('Height is required.'),
    'neck': number().min(20, 'Neck cannot be less than 20').required('Neck is required.'),
    'abdomen': number().when('gender', {
        is: 'male',
        then: number().min(40, 'Abdomen cannot be less than 40').required('Abdomen is required.'),
        otherwise: number().notRequired()
    }),
    'waist': number().when('gender', {
        is: 'female',
        then: number().min(30, 'Waist cannot be less than 30').required('Waist is required.'),
        otherwise: number().notRequired()
    }),
    'hip': number().when('gender', {
        is: 'female',
        then: number().min(40, 'Hip cannot be less than 40').required('Hip is required.'),
        otherwise: number().notRequired()
    }),
    'activity': string()
        .required('Activity is required')
        .notOneOf([''], 'Please select activity.'),
    'calorieIntake': string()
        .required('Calorie Intake is required')
        .notOneOf([''], 'Please select calorie intake.'),
})