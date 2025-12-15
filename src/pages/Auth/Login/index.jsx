import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { getCurrentUser, login } from "@/services/auth/authService";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/features/auth/hooks";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/utils/schema/loginSchema";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });
    const [isError, setIsError] = useState(false);
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
        try {
            const { access_token, refresh_token } = await login(data);

            if (access_token) {
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                dispatch(getCurrentUser());
            }
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col relative  ">
            <div className="flex items-center justify-center px-4 ">
                <div className="w-full max-w-md">
                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-4 p-4"
                    >
                        <h1 className=" w-full h-[50px] sm:w-[370px] text-2xl font-bold text-foreground mb-6 text-center">
                            Đăng nhập bằng tài khoản Instagram
                        </h1>

                        {/* Username/Email/Phone Input */}
                        <Input
                            type="text"
                            {...register("login")}
                            placeholder="Tên người dùng, số điện thoại hoặc email"
                            className="bg-muted border-border p-4 w-full h-[50px] sm:w-[370px]"
                        />
                        {errors.login && (
                            <p className="text-red-500">
                                {errors.login.message}
                            </p>
                        )}

                        {/* Password Input */}
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password")}
                            className="bg-muted border-border p-4 h-[50px] w-full sm:w-[370px]"
                        />
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        {isError && (
                            <p className="text-red-500">
                                Sai tài khoản hoặc mật khẩu
                            </p>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="p-4 h-[50px] w-full sm:w-[370px] bg-black text-white hover:bg-black/90 "
                        >
                            Đăng nhập
                        </Button>

                        {/* Forgot Password Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-foreground hover:underline"
                                onClick={() => {
                                    navigate("/forgot-password");
                                }}
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
                            className="w-full sm:w-[370px] border-foreground/20 hover:bg-accent h-10"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <span className="font-medium">
                                    Bạn chưa có tài khoản? Đăng ký
                                </span>
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
