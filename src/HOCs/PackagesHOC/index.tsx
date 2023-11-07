import React from 'react';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

interface IPackagesHOC {
  children: React.ReactNode;
}
const PackagesHOC: React.FC<IPackagesHOC> = ({ children }) => {
  return <>{children}</>;
};

export default PackagesHOC;
