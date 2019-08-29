import React from 'react';

import Header from './Header';
import OpenSource from './OpenSource';
import WhyUs from './WhyUs';
import ExampleSimpleYetPowerful from './ExampleSimpleYetPowerful';
import ExampleFullyCustomizable from './ExampleFullyCustomizable';
import Gitter from './Gitter';
import WhoUses from './WhoUses';
import Testimonials from './Testimonials';
import Comparison from './Comparison';
// import Footer from './Footer';

import styles from './index.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <Header />
      <OpenSource />
      <WhyUs />
      <ExampleSimpleYetPowerful />
      <ExampleFullyCustomizable />
      <Gitter />
      <WhoUses />
      <Testimonials />
      <Comparison />
      {/*<Footer /> */}
    </div>
  );
}
