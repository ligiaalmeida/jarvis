import React from 'react';

import * as Types from './types';
import Logo from 'assets/img/logo-jarvis.png';

const Brand: React.FC<Types.BrandProps> = ({ alt = 'Imagem com o texto JARVIS', width = 254, height = 27 }) => {
  return <img src={Logo} alt={alt} width={width} height={height} onDragStart={(e) => e.preventDefault()} />;
};

export default Brand;
