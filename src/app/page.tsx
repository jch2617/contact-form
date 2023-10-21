import Form from "../../public/components/Form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form />
      </div>
    </main>
  );
}
