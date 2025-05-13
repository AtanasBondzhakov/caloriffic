export default function Input({
    className,
    name,
    onChange,
    value,
    label,
    disabled
}) {
    return (
        <div className={className}>
            <label htmlFor={name}>{label}:</label>
            <input
                type="number"
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </div>
    );
};
