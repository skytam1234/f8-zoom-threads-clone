import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { register as authRegister } from "@/services/auth/authService";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import registerSchema from "@/utils/schema/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,

        watch,
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(registerSchema),
    });
    const [errorInf, setErrorInf] = useState(null);
    const navigate = useNavigate();
    const emailValue = watch("email");
    const userValue = watch("username");
    useEffect(() => {
        setErrorInf(null);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (emailValue) {
                trigger("email");
                setErrorInf(null);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [emailValue, trigger]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (userValue) {
                trigger("username");
                setErrorInf(null);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [userValue, trigger]);

    const submit = async (data) => {
        try {
            await authRegister(data);
            navigate("/login");
        } catch (er) {
            const errorMes =
                er?.response?.data?.errors || "Vui lòng kiểm tra lại thông tin";
            setErrorInf(errorMes);
            console.log(errorInf);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col relative mt-20 ">
            <div className="flex items-center justify-center px-4 py-2">
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
                            {...register("username")}
                            placeholder="Tên người dùng"
                            className="bg-muted border-border p-4 w-full h-[45px] sm:w-[370px]"
                        />
                        {errors.username && (
                            <p className="text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                        <Input
                            type="text"
                            {...register("email")}
                            placeholder="Email ..."
                            className="bg-muted border-border p-4 w-full h-[45px] sm:w-[370px]"
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.message}
                            </p>
                        )}

                        {/* Password Input */}
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password")}
                            className="bg-muted border-border p-4 h-[45px] w-full sm:w-[370px]"
                        />
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password_confirmation")}
                            className="bg-muted border-border p-4 h-[45px] w-full sm:w-[370px]"
                        />
                        {errorInf && (
                            <p className="text-red-500">
                                {errorInf.email
                                    ? errorInf.email[0]
                                    : errorInf.username[0]}
                            </p>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="p-4 h-[45px] w-full sm:w-[370px] bg-black text-white hover:bg-black/90 "
                        >
                            Đăng ký
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
                        {!errorInf && (
                            <p className="text-red-500">{errorInf}</p>
                        )}

                        {/* Continue with Instagram Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-foreground/20 hover:bg-accent h-10 sm:w-[370px]"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <div className="flex items-center justify-center gap-3 ">
                                <span className="font-medium">
                                    Bạn đã có tài khoản? Đăng nhập
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

export default Register;
