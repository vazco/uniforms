import classNames from 'classnames';
import React from 'react';

import styles from '../../css/index.module.css';
// import { CommercialServices } from './CommercialServices';
// import { Comparison } from './Comparison';
// import { Discussions } from './Discussions';
// import { ExampleFullyCustomizable } from './ExampleFullyCustomizable';
// import { ExampleSimpleYetPowerful } from './ExampleSimpleYetPowerful';
import { Footer } from './Footer';
import { Header } from './Header';
// import { OpenSource } from './OpenSource';
// import { Testimonials } from './Testimonials';
// import { WhoUses } from './WhoUses';
// import { WhyUs } from './WhyUs';

export function LandingPage() {
  return (
    <div className={classNames(styles.landing, styles['overflow-hidden'])}>
      <Header />
      <div className="main">
        {/* <div className="container">
          <OpenSource />
          <Testimonials />
        </div>
        <WhyUs />
        <div className="container">
          <ExampleSimpleYetPowerful />
          <ExampleFullyCustomizable />
          <Discussions />
        </div>
        <WhoUses />
        <div className="container">
          <Comparison />
        </div>
        <div className="container" id="commercial-services">
          <CommercialServices />
        </div> */}
        <Footer />
      </div>
    </div>
  );
}
