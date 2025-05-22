import { object, string, ref } from 'yup';

export const registerSchema = object().shape({
    'email': string().email('Invalid email format').required('Email is required'),
    'password': string().min(4, 'Password should be at least 4 characters long').required('Password is required'),
    'confirmPassword': string().oneOf([ref('password')], 'Passwords mismatch').required('Confirm password is required')
});