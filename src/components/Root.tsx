import Link from "next/link";
import styles from "@/styles/root.module.css";

const Root = () => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.mainTitle}>Pack</h1>
            <h2 className={styles.subTitle}>軽量なグループチャットアプリ</h2>
            <p className={styles.description}>リアルタイムに会話することができます</p>
            <p className={styles.description}>チャット中は更新をする必要がありません</p>
            <h2 className={styles.subTitle}>名前の由来</h2>
            <p className={styles.description}>
              狼はパックと言われる群れを作って生活し、コミュニケーションを取りながら生存しています。
            </p>
            <p className={styles.description}>コミュニティを作って、多くの人々と繋がってほしい願いからPackと名付けました</p>

        </div>
        <div className={styles.buttonContainer}>
          <Link href="/signin" className={styles.customButton1}>ユーザー登録・認証</Link>
          <Link href="/room/list" className={styles.customButton2}>チャットに参加する</Link>
          <Link href="/room/create" className={styles.customButton3}>チャットルームを作る</Link>
        </div>
    </div>
  );
}
export default Root;
