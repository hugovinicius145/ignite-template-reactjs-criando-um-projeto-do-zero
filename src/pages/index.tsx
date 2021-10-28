import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar } from 'react-icons/fi'
import { BsPerson } from 'react-icons/bs';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

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

export default function Home({postsPagination}: HomeProps) {

  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleLoadPosts() {
    const response = await fetch(`${postsPagination.next_page}`);
    const data = await response.json();

    const newPosts = data.results.map((post: Post) => {
      return {
        uid: post.uid,
        first_publication_date: new Date(post.first_publication_date).toLocaleString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        data: {
          title: RichText.asText(post.data.title),
          subtitle: post.data?.subtitle,
          author: post.data?.author,
        }
      }
    });

    setPosts([...posts, ...newPosts]);
    setNextPage(data?.next_page);
  }

  return (
    <>
      <Head>
        <title>Home - Spacetraveling</title>
      </Head>
      <main className={styles.container}>
        {posts.map((post) => (
          <div className={styles.posts} key={post.uid}>
            <Link href={`/posts/${post.uid}`}>
              <a>{post.data.title}</a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div>
              <FiCalendar />
              <p>{post.first_publication_date}</p>
              <BsPerson />
              <p>{post.data.author}</p>
            </div>
          </div>
        ))}
        {nextPage ?
          <h6 onClick={() => handleLoadPosts()}>Carregar mais posts</h6>
          : null
        }

      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    fetch: ['post.title', 'post.author', 'post.subtitle'],
    pageSize: 2,
  });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(post.first_publication_date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      data: {
        title: RichText.asText(post.data.title),
        subtitle: post.data?.subtitle,
        author: post.data?.author,
      }
    }
  })

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    }
  }
};
