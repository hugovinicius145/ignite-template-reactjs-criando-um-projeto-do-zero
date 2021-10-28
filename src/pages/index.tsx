import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar } from 'react-icons/fi'
import { BsPerson } from 'react-icons/bs';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// export default function Home() {
//   // TODO
// }

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
export default function Home() {

  return (
    <>
      <Head>
        <title>Home - Spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href={`/posts/slug`}>
            <a href="">Como utilizar hooks</a>
          </Link>
          <p>pensando em sincronização em vez de ciclos de vida.</p>


          <div>
            <FiCalendar />
            <p>15 Mar 2021</p>
            <BsPerson />
            <p>Hugo Vinicius</p>
          </div>
        </div>

        {/* ------------ */}
        <div className={styles.posts}>
          <Link href={`/posts/slug`}>
            <a href="">Como utilizar hooks</a>
          </Link>
          <p>pensando em sincronização em vez de ciclos de vida.</p>


          <div>
            <FiCalendar />
            <p>15 Mar 2021</p>
            <BsPerson />
            <p>Hugo Vinicius</p>
          </div>
        </div>
        <div className={styles.posts}>
          <Link href={`/posts/slug`}>
            <a href="">Como utilizar hooks</a>
          </Link>
          <p>pensando em sincronização em vez de ciclos de vida.</p>


          <div>
            <FiCalendar />
            <p>15 Mar 2021</p>
            <BsPerson />
            <p>Hugo Vinicius</p>
          </div>
        </div>
        <div className={styles.posts}>
          <Link href={`/posts/slug`}>
            <a href="">Como utilizar hooks</a>
          </Link>
          <p>pensando em sincronização em vez de ciclos de vida.</p>


          <div>
            <FiCalendar />
            <p>15 Mar 2021</p>
            <BsPerson />
            <p>Hugo Vinicius</p>
          </div>
        </div>
        <div className={styles.posts}>
          <Link href={`/posts/slug`}>
            <a href="">Como utilizar hooks</a>
          </Link>
          <p>pensando em sincronização em vez de ciclos de vida.</p>


          <div>
            <FiCalendar />
            <p>15 Mar 2021</p>
            <BsPerson />
            <p>Hugo Vinicius</p>
          </div>
        </div>
        {/* --------------------------- */}

        <h6>Carregar mais posts</h6>
      </main>
    </>
  );
}
