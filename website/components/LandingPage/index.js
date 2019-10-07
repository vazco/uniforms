import React from 'react';
import classNames from 'classnames';

import Comparison from './Comparison';
import ExampleFullyCustomizable from './ExampleFullyCustomizable';
import ExampleSimpleYetPowerful from './ExampleSimpleYetPowerful';
import Footer from './Footer';
import Gitter from './Gitter';
import Header from './Header';
import OpenSource from './OpenSource';
import Testimonials from './Testimonials';
import WhoUses from './WhoUses';
import WhyUs from './WhyUs';
import styles from './index.module.css';

export default function LandingPage() {
  return (
    <div className={classNames(styles.landing, styles['overflow-hidden'])}>
      <Header />
      <div className="main">
        <div className="container">
          <OpenSource />
          <Testimonials />
        </div>
        <WhyUs />
        <div className="container">
          <ExampleSimpleYetPowerful />
          <ExampleFullyCustomizable />
          <Gitter />
        </div>
        <WhoUses />
        <div className="container">
          <Comparison />
        </div>
        <Footer />
      </div>
    </div>
  );
}
