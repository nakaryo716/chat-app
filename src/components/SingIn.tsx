'use client'
import { useState } from "react";
import styles from "@/styles/signin.module.css";
import { loginApi } from "@/api/authApi";
import { AuthPayload } from "@/types/auth";
import Link from "next/link";
import { ErrorResMsg } from "@/types/error";
import { errorHandle } from "@/util/errorHandl";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [mailInput, setMailInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");
    const [AuthOk, setAuthOk] = useState(false);
    const router = useRouter();
    
    const loginHandler = async () => {
        const authPayload: AuthPayload = {
            clientMail: mailInput,
            clientPass: pwdInput,
        };
        const res = await loginApi(authPayload);

        if (!res.ok) {
            const errorRes: ErrorResMsg = await res.json();
            errorHandle(errorRes, router)
            return;
        }
        setAuthOk(true);
    }

    const onClickHandle = () => {
        loginHandler();
        setMailInput("");
        setPwdInput("");
    }

    const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickHandle();
        }
    };

    if (AuthOk) {
        return(
            <div className={styles.formContainer}>
                <h3>ログイン成功</h3>
                <a href="/" className={styles.customButton}>ホームに移動する</a>

            </div>
        )
    } else {
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
                        onKeyDown={keyDownHandle}
                    />
                </div>
                <div>
                    <button className={styles.customButton} onClick={onClickHandle}>サインイン</button>
                </div>
                <Link href="/signup" className={styles.link}>ユーザー登録はこちらから</Link>
            </div>
        );

    }
}

export default SignIn;
