import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Main`}
      description="Locktopus - a service for managing locks"
    >
      <div
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

        <h1>Get rid of race conditions in your application</h1>
        <h2>
          Let Locktopus to manage your locks efficiently. Refer to{' '}
          <a href="/docs/overview">Docs</a> to get started
        </h2>
      </div>
    </Layout>
  );
}
