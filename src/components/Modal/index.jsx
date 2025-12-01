export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; // nếu chưa mở thì không render gì

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>
            {/* Nội dung Modal */}
            <div className="relative bg-white rounded-lg shadow-lg animate-modal-fade">
                {/* Nội dung truyền vào */}
                {children}
            </div>
        </div>
    );
}
