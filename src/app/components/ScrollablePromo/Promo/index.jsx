import React, { useContext } from 'react';
import { arrayOf, shape, string, oneOfType, object } from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifBold } from '@bbc/psammead-styles/font-styles';
import { C_GREY_6, C_GREY_8, C_WHITE } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';

const Link = styled.a`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSerifBold(service)}
  width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  color: ${C_GREY_8};
  &:visited {
    color: ${C_GREY_6};
  }
`;

const PromoBox = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  background-color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL};

  ${({ isOperaMini }) =>
    isOperaMini
      ? `width: calc(100% - ${GEL_SPACING});`
      : `@media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    width: 14.8125rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 11.125rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 12.6875rem;
  }`}
`;

const Promo = ({ block }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const textBlock = filterForBlockType(
    pathOr({}, ['model', 'blocks'], block),
    'text',
  );
  const href = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
    textBlock,
  );
  const title = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
    textBlock,
  );

  const isOperaMini = useOperaMiniDetection();

  return (
    <PromoBox dir={dir} isOperaMini={isOperaMini}>
      <Link href={href} service={service} script={script} dir={dir}>
        {title}
      </Link>
    </PromoBox>
  );
};

Promo.propTypes = {
  block: shape({
    model: shape({
      blocks: arrayOf(oneOfType([string, object])),
    }).isRequired,
  }).isRequired,
};

export default Promo;
