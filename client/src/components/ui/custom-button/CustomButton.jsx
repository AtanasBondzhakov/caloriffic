export default function CustomButton({
    handleClick,
    label,
    type,
    className,
    loading,
}) {
    return (
        <button
            className={className}
            type={type}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? 'Loading...' : label}
        </button>
    );
}