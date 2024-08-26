'use client';

import styles from '@/app/ui/home.module.css';
import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.loginCard}>
        <h2>Office 365 login in Next.js using NextAuth.js </h2>
        <button
          className={styles.actionButton}
          onClick={() => {
            signIn(
              'azure-ad',
              { callbackUrl: '/dashboard' },
              { prompt: 'login' },
            );
          }}
        >
          Log in
        </button>
      </div>
    </main>
  );
}
