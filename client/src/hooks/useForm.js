import { useState } from "react";

export const useForm = (initialValues, submitHandler, validationSchema) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema?.validate(values, { abortEarly: false });
            await submitHandler(values);

            setValues(initialValues);
            setErrors({});
        } catch (err) {
            const validationErrors = {};

            err?.inner?.forEach(error => {
                validationErrors[error.path] = error.message;
            });

            setErrors(validationErrors);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    };
};