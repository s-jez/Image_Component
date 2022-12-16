import Head from "next/head";
import { Inter } from "@next/font/google";
import ImageContainer from "./components/Image/Container/ImageContainer";
import styles from "../styles/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Component</title>
        <meta name="description" content="Image Component by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <main className={styles.main}>
          <ImageContainer />
        </main>
      </div>
    </>
  );
}
