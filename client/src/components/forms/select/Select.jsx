export default function Select({
    className,
    name,
    onChange,
    options,
    value
}) {
    return (
        <>
            <label htmlFor={name}>Activity:</label>
            <select name={name} id={name} className={className} onChange={onChange} value={value}>
                <option value="">Choose...</option>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </option>)
                )}
            </select>
        </>
    );
};