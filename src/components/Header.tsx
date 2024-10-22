import styles from '@/styles/header.module.css';
import { getUserInfo } from '@/api/userApi';
import { UserInfo } from '@/types/user';
import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';

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
      <Link href="/user" className={styles.username}>{username}</Link>
    </header>
  );
});

export default Header;
