import { object, string } from "yup";

const forgotSchema = object({
  email: string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
});
export default forgotSchema;
