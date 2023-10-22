import type { ReactElement } from "react";
import Form from "../public/components/Form";
import Layout from "../public/components/layout";
import styles from "../src/app/page.module.css";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form />
      </div>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
