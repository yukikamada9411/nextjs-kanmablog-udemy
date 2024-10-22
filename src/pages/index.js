import Image from "next/image";
import styles from "../../src/styles/Home.module.css";
import localFont from "next/font/local";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/Layout";
import utilStyle from "../../src/styles/utils.module.css";
import { getPostsData } from "../../lib/post";
import Head from "next/head";

/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/

export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <secition className={utilStyle.headingMd}>
        <p>私はフルスタックエンジニアです。</p>
      </secition>
      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
          ;
        </div>
      </section>
    </Layout>
  );
}
