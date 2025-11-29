import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { getCurrentUser, login } from "@/services/auth/authService";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/features/auth/hooks";
import { useEffect } from "react";

function Login() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();
    const [param] = useSearchParams();

    useEffect(() => {
        if (currentUser) {
            const continuePath = param.get("continue") || "/";
            navigate(continuePath);
        }
    }, [currentUser, navigate, param]);

    const submit = async (data) => {
        const { access_token, refresh_token } = await login(data);
        if (access_token) {
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            dispatch(getCurrentUser());
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col relative mt-20 ">
            <div className="flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-4 p-4"
                    >
                        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
                            Đăng nhập bằng tài khoản Instagram
                        </h1>

                        {/* Username/Email/Phone Input */}
                        <Input
                            type="text"
                            {...register("login")}
                            placeholder="Tên người dùng, số điện thoại hoặc email"
                            className="bg-muted border-border p-4 w-full h-[55px] sm:w-[370px]"
                        />

                        {/* Password Input */}
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password")}
                            className="bg-muted border-border p-4 h-[55px] w-full sm:w-[370px]"
                        />

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="p-4 h-[55px] w-full sm:w-[370px] bg-black text-white hover:bg-black/90 "
                        >
                            Đăng nhập
                        </Button>

                        {/* Forgot Password Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-foreground hover:underline"
                            >
                                Quên mật khẩu?
                            </button>
                        </div>

                        {/* Separator */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-1 border-t border-border"></div>
                            <span className="px-4 text-sm text-muted-foreground bg-background">
                                hoặc
                            </span>
                            <div className="flex-1 border-t border-border"></div>
                        </div>

                        {/* Continue with Instagram Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-foreground/20 hover:bg-accent h-10"
                        >
                            <div className="flex items-center justify-center gap-3">
                                {/* Instagram Logo */}
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="url(#instagram-gradient)"
                                >
                                    <defs>
                                        <linearGradient
                                            id="instagram-gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#f09433"
                                            />
                                            <stop
                                                offset="25%"
                                                stopColor="#e6683c"
                                            />
                                            <stop
                                                offset="50%"
                                                stopColor="#dc2743"
                                            />
                                            <stop
                                                offset="75%"
                                                stopColor="#cc2366"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#bc1888"
                                            />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="font-medium">
                                    Tiếp tục bằng Instagram
                                </span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
            {/* Footer and QR Code */}
        </div>
    );
}

export default Login;
