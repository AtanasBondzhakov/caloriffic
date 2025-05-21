export default function Button({
    className,
    type,
    label,
    onClick
}) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
