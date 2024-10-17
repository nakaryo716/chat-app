import { getUserInfo } from '@/api/userApi';
import { UserInfo } from '@/types/user';
import React, { useEffect, useState } from 'react';

const Header = () => {
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
    <header style={styles.header}>
      <a href="/" style={styles.logo}>Pack</a>
      <span style={styles.username}>{username}</span>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    // backgroundColor: '#2c2c2c', // 落ち着いたダークカラー
    borderBottom: '2px solid #c0c0c0', 
    color: '#c0c0c0', // 全体のテキストカラーに合わせる
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e3a96c', // メインタイトルの色と一致
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  username: {
    fontSize: '18px',
    color: '#f5f5f5', // サブタイトルと一致
  },
};
export default Header;
