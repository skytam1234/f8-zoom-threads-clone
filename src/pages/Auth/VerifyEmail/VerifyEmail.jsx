import { verifyEmail } from "@/services/auth/authService";

import { Navigate, useNavigate, useSearchParams } from "react-router";

import { useEffect, useState } from "react";

function VerifyEmail() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMes, setErrorMes] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    useEffect(() => {
        const fetData = async () => {
            try {
                const res = await verifyEmail({ token: token });
                navigate("/login");
            } catch (errors) {
                setError(true);
                const mes = errors?.response?.data?.message || "Thất bại";
                setErrorMes(mes);
            }
        };
        fetData();
    }, []);
    if (error)
        return <div className="w-100 h-40  mx-auto text-3xl">{errorMes}</div>;
    return <div className="w-100 h-40  mx-auto text-3xl">Đang xác thực</div>;
}

export default VerifyEmail;
