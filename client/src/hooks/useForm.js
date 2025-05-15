import { useState } from "react";

export const useForm = (initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitHandler(values);
        setValues(initialValues)
    };

    return {
        values,
        handleChange,
        handleSubmit
    };
};