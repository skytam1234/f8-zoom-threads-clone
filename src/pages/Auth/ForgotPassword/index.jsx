import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/services/auth/authService";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import forgotSchema from "@/utils/schema/forgotSchema";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "@/features/auth/authSlice";

import { useNavigate } from "react-router";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state[authSlice.reducerPath].forgotPass
  );

  const emailValue = watch("email");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailValue) {
        trigger("email");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [emailValue, trigger]);

  const submit = async (data) => {
    try {
      dispatch(forgotPassword(data));
    } catch (error) {
      console.log("loi");
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative  ">
      <div className="flex items-center justify-center px-4 ">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <form onSubmit={handleSubmit(submit)} className="space-y-4 p-4">
            <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
              Quên mật khẩu
            </h1>

            {/* Username/Email/Phone Input */}
            <Input
              type="text"
              {...register("email")}
              placeholder="Vui lòng nhập email"
              className="bg-muted border-border p-4 w-full h-[50px] sm:w-[370px]"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            {message && (
              <div className="">
                <p className={error ? "text-red-500" : "text-blue-500"}>
                  {message}
                </p>
                <div
                  className="text-xl hover:text-black/60"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="p-0 h-[50px] w-full sm:w-[370px] bg-black text-white hover:opacity-50 transition-all  "
            >
              <Item variant="muted" className="flex bg-transparent">
                <ItemMedia>
                  <Spinner className={loading ? "block " : "hidden"} />
                </ItemMedia>
                <ItemContent className="">
                  <ItemTitle className=" p-0">Đăng nhập</ItemTitle>
                </ItemContent>
              </Item>
            </Button>

            {/* Login Button */}
          </form>
        </div>
      </div>
      {/* Footer and QR Code */}
    </div>
  );
}

export default ForgotPassword;
