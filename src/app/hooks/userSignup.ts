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
            const res = await fetch("http://localhost:8080/auth/signup", {
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
