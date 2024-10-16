'use client'
import { useState } from "react";
import styles from "@/styles/signin.module.css";
import { loginApi } from "@/api/authApi";
import { AuthPayload } from "@/types/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
    const [mailInput, setMailInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");
    const router = useRouter();

    const loginHandler = async () => {
        const authPayload: AuthPayload = {
            clientMail: mailInput,
            clientPass: pwdInput,
        };
        
        const res = await loginApi(authPayload);

        if (!res.ok) {
            alert("認証エラー");
        }

        router.push("/");
    }

    const onClickHandle = () => {
        loginHandler();
        setMailInput("");
        setPwdInput("");
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>ログイン</h1>
            <div>
                <h2>ユーザーアドレス</h2>
                <input
                    type="text"
                    value={mailInput}
                    onChange={(e) => setMailInput(e.target.value)}
                    className={styles.inputTxt}
                />
            </div>
            <div>
                <h2>パスワード</h2>
                <input 
                    type="password"
                    value={pwdInput}
                    onChange={(e) => setPwdInput(e.target.value)}
                    className={styles.inputTxt}
                />
            </div>
            <div>
                <button className={styles.customButton} onClick={onClickHandle}>サインイン</button>
            </div>
            <Link href="/signup" className={styles.link}>ユーザー登録はこちらから</Link>
        </div>
    );
}

export default SignIn;
