import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              File-System Routing
              <span className={styles.heroSubtitle}>
                for Modern Express.js Applications
              </span>
            </Heading>

            <p className={styles.heroDescription}>
              Type-safe route configuration through directory structure
              <br />
              with built-in middleware support and automatic endpoint discovery
            </p>

            <div className={styles.ctaGroup}>
              <Link
                className={clsx(
                  'button button--primary button--lg',
                  styles.ctaMain,
                )}
                to="/docs/intro"
              >
                Get Started
              </Link>
              <Link
                className={clsx(
                  'button button--outline button--lg',
                  styles.ctaSecondary,
                )}
                to="/docs/api"
              >
                API Reference
              </Link>
            </div>
          </div>

          <div className={styles.codePreview}>
            <div className={styles.codeWindow}>
              <div className={styles.codeHeader}>
                <div className={styles.windowControls}>
                  <span className={styles.controlClose}></span>
                  <span className={styles.controlMinimize}></span>
                  <span className={styles.controlExpand}></span>
                </div>
                <span className={styles.fileName}>routes/user/[id].get.ts</span>
              </div>
              <pre className={styles.codeContent}>
                <code>
                  {`import { RequestHandler } from 'express';\n\n`}
                  {`export const handler: RequestHandler = (req, res) => {\n`}
                  {`  res.json({ userId: req.params.id });\n`}
                  {`};`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Enterprise-grade file-system routing solution for Express.js with TypeScript support and production-ready features"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
