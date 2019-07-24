import DocusaurusContext from '@docusaurus/context';
import Link from '@docusaurus/Link';
import React, { useContext } from 'react';

import styles from './styles.module.css';
import { Container, Row, Column } from './Grid';

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Container>
        <Info />
      </Container>
    </React.Fragment>
  );
}

function Hero() {
  return (
    <div className="hero hero--dark">
      <div className="container">
        <h1 className="hero__title row">
          <div className={`${styles.half} ${styles.textBig}`}>
            <div className="text--primary">uniforms</div>
            <div>
              A set of React libraries for building{' '}
              <span className="text--info">forms</span>.
            </div>
          </div>
          <div className={`${styles.half} text--center`}>
            <img alt="Logo" src="img/uniforms.svg" />
          </div>
        </h1>
      </div>
    </div>
  );
}

function Info() {
  const { siteConfig } = useContext(DocusaurusContext);

  return (
    <Row>
      <Column>
        <h1>What's included?</h1>
        <ul>
          <li>Automatic forms generation</li>
          <li>Fields capable of rendering every schema</li>
          <li>
            Integrations with various schemas:
            <ul>
              <li>
                <a href="https://json-schema.org">JSON Schema</a>
              </li>
              <li>
                <a href="https://github.com/graphql/graphql-js">GraphQL</a>
              </li>
              <li>
                <a href="https://github.com/aldeed/meteor-simple-schema">
                  SimpleSchema
                </a>
              </li>
              <li>
                <a href="https://github.com/aldeed/node-simple-schema">
                  SimpleSchema@2
                </a>
              </li>
              <li>
                And any other - only{' '}
                <Link to={`${siteConfig.baseUrl}docs/bridges-concept`}>
                  a small wrapper
                </Link>{' '}
                is needed!
              </li>
            </ul>
          </li>
        </ul>
      </Column>
      <Column>
        <h1>&nbsp;</h1>
        <ul>
          <li>Helper for creating custom fields with one line</li>
          <li>Inline and asynchronous form validation</li>
          <li>
            Wide range of themes:
            <ul>
              <li>
                <a href="https://ant.design">AntD</a> theme
              </li>
              <li>
                <a href="https://getbootstrap.com/docs/3.3/">Bootstrap3</a>{' '}
                theme
              </li>
              <li>
                <a href="https://getbootstrap.com">Bootstrap4</a> theme
              </li>
              <li>
                <a href="https://material-ui.com">Material-UI</a> theme
              </li>
              <li>
                <a href="https://semantic-ui.com">Semantic UI</a> theme
              </li>
              <li>plain HTML theme</li>
            </ul>
          </li>
        </ul>
      </Column>
    </Row>
  );
}
