import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.css';
import { Container, Row, Column } from './Grid';
import Examples from './Examples';
import Matrix from './CompareMatrix';
import Stats from './Stats';
import Footer from './Footer';
import { SectionButton, SectionQuestions } from './CallToAction';

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <SectionButton title="Get started" />
      <Container>
        <Info />
        <Examples />
        <Matrix />
        <Stats />
      </Container>
      <SectionQuestions title="Questions?" subtitle="Contact us" />
      <Footer />
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
  return (
    <Row>
      <p style={{ fontSize: '1.25em' }}>
        Open source tool capable of generating any given form, which bridges the
        gap. Integration with every schema keeps the code simple. Powered by
        passion. Carried out by the global community of 50+ developers. Provides
        effortless development experience. Easy-to-use tool, ready-to-implement
        solution.
      </p>
      <Column>
        <b>Integrations with various schemas:</b>
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
            <Link to={'/docs/uth-bridge-concept'}>a small wrapper</Link> is
            needed!
          </li>
        </ul>
      </Column>
      <Column>
        <b>Wide range of themes:</b>
        <ul>
          <li>
            <a href="https://ant.design">AntD</a> theme
          </li>
          <li>
            <a href="https://getbootstrap.com/docs/3.3/">Bootstrap3</a> theme
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
      </Column>
    </Row>
  );
}
