export default function Item({
    className,
    children,
    onClickHandler
}) {
    return (
        <div className={className} onClick={onClickHandler}>
            <p>{children}</p>
        </div>
    );
};
