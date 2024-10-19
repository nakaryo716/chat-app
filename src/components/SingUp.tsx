'use client'
import { useState } from "react";
import styles from "@/styles/signup.module.css";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/types/user";
import { CreateUserApi } from "@/api/userApi";
import { ErrorResMsg } from "@/types/error";

const SigunUp = () => {
    const [userNameInput, setUserNameInput] = useState("");
    const [mailInput, setMailInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");
    const router = useRouter();

    const loginHandler = async () => {
        const createUserPayload: CreateUser = {
            userName: userNameInput,
            userMail: mailInput,
            userPass: pwdInput,
        };
        
        const res = await CreateUserApi(createUserPayload);

        if (!res.ok) {
            const resMsg: ErrorResMsg = await res.json();
            alert(resMsg.error)
            return;
        }        
        router.push("/signin");
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

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>ユーザー登録</h1>
            <div>
                <h2>ユーザー名</h2>
                <input
                    type="text"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    className={styles.inputTxt}
                />
            </div>
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
                <button className={styles.customButton} onClick={onClickHandle}>登録</button>
            </div>
        </div>
    );
}

export default SigunUp;
