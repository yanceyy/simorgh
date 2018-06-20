import React from 'react';
import styled from 'styled-components';
import { C_STORM, C_WHITE, FF_NEWS, SP_16 } from '../../constants';

const StyledFooter = styled.footer`
  background-color: ${C_STORM};
  font-family: ${FF_NEWS};
  padding: ${SP_16};
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
`;

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledParagraph>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </StyledParagraph>
  </StyledFooter>
);

export default Footer;
