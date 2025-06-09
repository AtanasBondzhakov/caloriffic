export default function Select({
    className,
    name,
    onChange,
    options,
    value,
    label
}) {
    return (
        <div>
            <label htmlFor={name}>{label}:</label>
            <select
                name={name}
                id={name}
                className={className}
                onChange={onChange}
                value={value}
            >
                <option value="">Choose...</option>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </option>)
                )}
            </select>
        </div>
    );
};