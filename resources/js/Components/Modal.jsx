export default function Modal({
    children,
    show = false,
    onClose = () => {},
}) {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}