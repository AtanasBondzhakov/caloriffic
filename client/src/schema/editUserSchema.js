import { object, string } from 'yup';

export const editUserSchema = object().shape({
    'email': string().email('Invalid email format').required('Email is required'),
    'role': string().required('Role is required'),
});