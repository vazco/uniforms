import React from 'react';
import classNames from 'classnames';

import Header from './Header';
import OpenSource from './OpenSource';
import WhyUs from './WhyUs';
import ExampleSimpleYetPowerful from './ExampleSimpleYetPowerful';
import ExampleFullyCustomizable from './ExampleFullyCustomizable';
import Gitter from './Gitter';
import WhoUses from './WhoUses';
import Testimonials from './Testimonials';
import Comparison from './Comparison';
import Footer from './Footer';

import styles from './index.module.css';

export default function LandingPage() {
  return (
    <div className={classNames(styles.landing, styles['overflow-hidden'])}>
      <Header />
      <div className="main">
        <OpenSource />
        <WhyUs />
        <div className="container">
          <ExampleSimpleYetPowerful />
          <ExampleFullyCustomizable />
          <Gitter />
        </div>
        <WhoUses />
        <div className="container">
          <Testimonials />
          <Comparison />
        </div>
        <Footer />
      </div>
    </div>
  );
}
