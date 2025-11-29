// App.jsx
import React, { useState } from "react";
// Import các component shadcn/ui đã cài đặt
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// Import icons
import { Menu, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

// --- Component MainMenu (Phần tử 1 trong Modal) ---
const MainMenu = ({ onGoToThemeSettings, onReportIssue }) => {
    return (
        <div className="p-4 w-full">
            <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={onGoToThemeSettings} // Bấm vào đây sẽ chuyển View
            >
                <span className="text-sm font-medium">Giao diện</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>

            <div
                className="flex items-center justify-between p-2 mt-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={onReportIssue}
            >
                <span className="text-sm font-medium">Báo cáo sự cố</span>
            </div>
        </div>
    );
};

// --- Component ThemeSettings (Phần tử 2 trong Modal) ---
// Giả định bạn có component ToggleGroup từ shadcn/ui
const ToggleGroup = ({ children, value, onValueChange }) => (
    <div className="grid grid-cols-3 gap-2 w-full max-w-sm bg-gray-800 rounded-md p-1">
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {
                onClick: () => onValueChange(child.props.value),
                className: `flex-1 rounded-sm ${
                    child.props.value === value ? "bg-gray-700" : ""
                } hover:bg-gray-700 cursor-pointer p-2 flex items-center justify-center text-sm transition-colors`,
            })
        )}
    </div>
);
const ToggleGroupItem = ({ children, value, onClick, className }) => (
    <button type="button" onClick={onClick} className={className}>
        {children}
    </button>
);

const ThemeSettings = ({ onBack, currentTheme, onThemeChange }) => {
    return (
        <div className="p-4 w-full">
            <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ChevronLeft className="h-4 w-4" /> {/* Nút quay lại */}
                </Button>
                <h3 className="text-lg font-semibold flex-grow text-center mr-8">
                    Giao diện
                </h3>
            </div>

            <div className="flex justify-center">
                <ToggleGroup value={currentTheme} onValueChange={onThemeChange}>
                    <ToggleGroupItem value="light">
                        <Sun className="h-4 w-4 mr-2" /> Sáng
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark">
                        <Moon className="h-4 w-4 mr-2" /> Tối
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system">Tự động</ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
};

// --- Component Chính MenuHandler ---
const MenuHandler = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("mainMenu"); // 'mainMenu' hoặc 'themeSettings'
    const [currentTheme, setCurrentTheme] = useState("dark");

    // Xử lý khi click vào "Giao diện" -> chuyển sang View 2
    const handleGoToThemeSettings = () => {
        setCurrentView("themeSettings");
    };

    // Xử lý khi click vào nút "Quay lại" -> chuyển về View 1
    const handleBackToMainMenu = () => {
        setCurrentView("mainMenu");
    };

    // Xử lý đóng Modal
    const handleModalClose = (open) => {
        if (!open) {
            setIsModalOpen(false);
            setCurrentView("mainMenu"); // Quan trọng: Reset view khi Modal đóng hẳn
        } else {
            setIsModalOpen(true);
        }
    };

    const handleThemeChange = (theme) => {
        setCurrentTheme(theme);
        // Logic áp dụng theme...
    };

    return (
        <div className="relative">
            <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
                <DialogTrigger asChild>
                    {/* Nút số 1 */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-4 left-4"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="w-80 p-0 overflow-hidden bg-gray-900 border-none rounded-lg shadow-lg">
                    {/* Dùng toán tử 3 ngôi để chuyển đổi giữa các Component */}
                    {currentView === "mainMenu" ? (
                        <MainMenu
                            onGoToThemeSettings={handleGoToThemeSettings} // Prop để kích hoạt chuyển đổi view
                            onReportIssue={() => {
                                alert("Bạn đã báo cáo sự cố!");
                                handleModalClose(false);
                            }}
                        />
                    ) : (
                        <ThemeSettings
                            onBack={handleBackToMainMenu} // Prop để kích hoạt quay lại view
                            currentTheme={currentTheme}
                            onThemeChange={handleThemeChange}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MenuHandler;
