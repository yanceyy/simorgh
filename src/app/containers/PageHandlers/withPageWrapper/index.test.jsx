import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { UserContextProvider } from '../../../contexts/UserContext';
import { ToggleContext } from '../../../contexts/ToggleContext';
import WithPageWrapper from '.';

const dataProps = {
  isAmp: false,
  service: 'news',
  route: { pageType: 'article' },
};

// eslint-disable-next-line react/prop-types
jest.mock('../../../Layouts/defaultPageWrapper', () => ({ children }) => (
  <div id="defaultPageWrapper">{children}</div>
));

const defaultToggleState = {
  test: {
    navOnArticles: {
      enabled: true,
    },
  },
  live: {
    navOnArticles: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

describe('with pageWrapper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ToggleContext.Provider
      value={{
        toggleState: defaultToggleState,
        toggleDispatch: mockToggleDispatch,
      }}
    >
      <ServiceContextProvider service="news">
        <RequestContextProvider
          isAmp={false}
          pageType="article"
          service="news"
          bbcOrigin="https://www.test.bbc.com"
        >
          <UserContextProvider>
            <PageWrapperHOC {...dataProps} />
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>,
  );
});
