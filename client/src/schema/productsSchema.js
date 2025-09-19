import { number, object } from "yup";

export const addProductToDailySchema = object().shape({
    'quantity': number().typeError('Quantity is required.').min(1, 'Quantity cannot be less than 1').required()
});