import React from 'react';

import Header from './Header';
import OpenSource from './OpenSource';
import WhyUs from './WhyUs';
import Gitter from './Gitter';
import WhoUses from './WhoUses';
import Testimonials from './Testimonials';
// import Comparison from './Comparison';
// import ExampleFullyCustomizable from './ExampleFullyCustomizable';
// import ExampleSimpleYetPowerful from './ExampleSimpleYetPowerful';
// import Footer from './Footer';

import './index.module.css';

export default function LandingPage() {
  return (
    <>
      <Header />
      <OpenSource />
      <WhyUs />
      <Gitter />
      <WhoUses />
      <Testimonials />
      {/*<ExampleSimpleYetPowerful />
      <ExampleFullyCustomizable />
      <Comparison />
      <Footer /> */}
    </>
  );
}
