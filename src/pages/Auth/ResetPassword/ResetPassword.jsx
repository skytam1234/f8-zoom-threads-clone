// const { password, password_confirmation } = watch();

// const isFormValid = password && password_confirmation;

// const navigate = useNavigate();

// const [loading, setLoading] = useState(false);
// const [validating, setValidating] = useState(true);
// const [isValidToken, setIsValidToken] = useState(false);
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { resetPassword } from "@/services/auth/authService";

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { use, useState } from "react";
import resetPasswordSchema from "@/utils/schema/resetPasswordSchema";

function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(resetPasswordSchema),
    });
    const [errorInf, setErrorInf] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const submit = async (data) => {
        try {
            data.token = token;
            console.log(data);
            const res = await resetPassword(data);
            navigate("/login");
            console.log(res);
        } catch (er) {
            setErrorInf(true);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col relative  ">
            <div className="flex items-center justify-center px-4 py-2">
                <div className="w-full max-w-md">
                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-4 p-4"
                    >
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

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="p-4 h-[45px] w-full sm:w-[370px] bg-black text-white hover:bg-black/90 "
                        >
                            Xác nhận
                        </Button>

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

export default ResetPassword;
