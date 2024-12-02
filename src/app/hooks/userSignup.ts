import { useState } from "react";

interface SignupDto {
    name: string;
    email: string;
    birthdate: string;
    password: string;
}

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const signup = async (signupData: SignupDto) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const res = await fetch("https://chart-app-currency-new-1cf60e87e39e.herokuapp.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            });

            if (!res.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            const data = await res.json();
            setSuccessMessage(data.message);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error, successMessage };
};

export default useSignup;
