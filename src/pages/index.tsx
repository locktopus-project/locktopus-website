import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Main`}
      description="Locktopus - a service for managing locks"
    >
      <div
        id="1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          height: '100%',
        }}
      >
        <h1 className="hero__title">{siteConfig.title}</h1>
        <div
          style={{
            width: '100%',
            maxHeight: '50vh',
            padding: '100px',
            overflow: 'hidden',
          }}
        >
          <img
            src="/img/locktopus.svg"
            alt="Locktopus"
            style={{
              objectFit: 'contain',
              height: '50vh',
              width: '100%',
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
