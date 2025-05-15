export default function Input({
    className,
    type = 'text',
    name,
    onChange,
    value,
    label,
    ...rest
}) {
    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                {...rest}
            />
        </div>
    );
};
