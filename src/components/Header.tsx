import styles from '@/styles/header.module.css';
import { getUserInfo } from '@/api/userApi';
import { UserInfo } from '@/types/user';
import React, { memo, useEffect, useState } from 'react';

const Header = memo(function Header() {
  const [username, setUsername] = useState<string>("読み込み中");
  useEffect(() => {
    const getUserHandler = async () => {
      const res = await getUserInfo();

      if (res.ok) {
        const userInfo: UserInfo = await res.json();
        setUsername(userInfo.userName);
      } else {
        setUsername("ログインが必要")
      }
    }
  
    getUserHandler();
  }, []);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>Pack</a>
      <span className={styles.username}>{username}</span>
    </header>
  );
});

export default Header;
