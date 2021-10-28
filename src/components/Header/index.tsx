import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a href="">
            <img src="/images/Logo.svg" alt="spacetraveling" />
          </a>
        </Link>
      </div>
    </header>
  );
}
