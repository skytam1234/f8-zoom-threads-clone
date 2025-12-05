function formatDateTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    // Tính chênh lệch mili giây
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours <= 24) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        if (diffMinutes < 60) {
            return `${diffMinutes} Phút`;
        } else {
            return `${Math.floor(diffHours)} Giờ`;
        }
    } else {
        // Định dạng chuẩn YYYY-MM-DD HH:mm:ss
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

export default formatDateTime;
