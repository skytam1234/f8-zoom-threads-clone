<div className="relative w-full pb-8 px-4">
    {/* QR Code - Bottom Right */}
    <div className="absolute bottom-8 right-4 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
            {/* QR Code Placeholder - Replace with actual QR code */}
            <div className="w-32 h-32 bg-muted border-2 border-dashed border-border flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center px-2">
                    QR Code
                </span>
            </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
            Quét để tải ứng dụng
        </p>
    </div>

    {/* Footer - Bottom Left */}
    <div className="absolute bottom-8 left-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-2">
            <span>© 2025</span>
            <a href="#" className="hover:underline">
                Điều khoản của Threads
            </a>
            <a href="#" className="hover:underline">
                Chính sách quyền riêng tư
            </a>
            <a href="#" className="hover:underline">
                Chính sách cookie
            </a>
            <a href="#" className="hover:underline">
                Báo cáo sự cố
            </a>
        </div>
    </div>
</div>;
