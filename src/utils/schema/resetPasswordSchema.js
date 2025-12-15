import { object, string, ref } from "yup";

const resetPasswordSchema = object({
    email: string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống"),
    password: string().required("Mật khẩu không được bỏ trống"),

    password_confirmation: string()
        .required("Xác nhận mật khẩu không được bỏ trống")
        .oneOf([ref("password")], "Mật khẩu xác nhận không khớp"),
});

export default resetPasswordSchema;
