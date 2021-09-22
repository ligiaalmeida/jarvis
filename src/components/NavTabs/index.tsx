import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';

import * as Animation from 'components/Animations';
import SettingsSwitchTabs from 'components/SettingsSwitchTabs';

import * as Types from './types';
import {
  KeysOfPagesContainingTimer,
  SettingsSwitchTabsProps,
  StateMapToPropsGlobal,
  SwitchChartView,
} from 'types';

import * as S from 'components/NavTabs/styles';

const NavTabs: React.FC<
  Types.NavTabsChartProps<React.ReactNode> &
    Types.MainProps &
    Pick<
      SettingsSwitchTabsProps,
      'actionAutomaticMode' | 'namespace' | 'actionTimer'
    >
> = ({
  children,
  isHeightFull,
  data,
  isSettings,
  padding,
  minHeight,
  actionAutomaticMode,
  actionTimer,
  namespace,
  loader = true,
}) => {
  const [active, setActive] = useState<number>(0);

  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );

  return (
    <S.Container namespace={namespace as KeysOfPagesContainingTimer}>
      {!loader && (
        <ContentLoader
          viewBox="0 0 1862 915"
          animate
          backgroundColor="#EFF3F8"
          foregroundColor="#D8DDE6"
        >
          <path
            d="M621 23a8 8 0 018-8h604c4.42 0 8 3.582 8 8v47H621V23zM0 8a8 8 0 018-8h604a8 8 0 018 8v62H0V8zM1242 23c0-4.418 3.58-8 8-8h604c4.42 0 8 3.582 8 8v47h-620V23zM0 70h1862v845H0z"
            fill="#C4C4C4"
          />
        </ContentLoader>
      )}
      {loader && (
        <>
          <S.Tabs id="tab__header" minHeight={minHeight || 10}>
            {!data.length
              ? ''
              : data.map((item) => (
                  <S.TabItem
                    key={item.label.id}
                    childrenCount={data.length}
                    isActive={active === item.label.id}
                    onClick={() => setActive(item.label.id as SwitchChartView)}
                  >
                    <Animation.TabItem idItem={item.label.id} active={active}>
                      <h2>{item.label.title}</h2>
                    </Animation.TabItem>
                  </S.TabItem>
                ))}
            {isSettings && (
              <SettingsSwitchTabs
                namespace={namespace}
                actionAutomaticMode={actionAutomaticMode}
                actionTimer={actionTimer}
                countOfTabs={data.length}
                setState={setActive}
              />
            )}
          </S.Tabs>

          <S.Main
            heightScreen={settingsGlobal.heightNavigation}
            isHeightFull={isHeightFull}
            padding={padding}
          >
            {!data.length
              ? ''
              : data.map((component, idx) => (
                  <Animation.BottomToTop
                    key={idx}
                    idItem={idx}
                    classes={namespace as string}
                    active={active}
                  >
                    {component.componentChildren.map((children) => children)}
                  </Animation.BottomToTop>
                ))}
            {children}
          </S.Main>
        </>
      )}
    </S.Container>
  );
};

export default NavTabs;
