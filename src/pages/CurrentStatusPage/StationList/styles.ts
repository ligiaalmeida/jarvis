import styled, { css } from 'styled-components';

import { Buildings, DirectionOfStations } from 'types';
import { Elevation, CustomScrollBar, Transition } from 'utils/styles/mixins';
import { makeStyles } from '@material-ui/core/styles';

const minWidthSidebar = 80;

export const useStyles = makeStyles(() => ({
  customTooltip: {
    fontFamily: "'DaimlerBold', sans-serif",
    fontSize: 10,
  },
}));

export const InformationItem = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      :not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .station-list {
        &__information {
          &__title {
            font-size: ${theme.typography.size.title_3};
            margin-bottom: 4px;
          }

          &__description {
            font-family: 'DaimlerBold', sans-serif;
            font-size: ${theme.typography.size.title_2};
            text-transform: uppercase;

            &--number {
              font-family: 'DaimlerBold', sans-serif;
              font-size: 10rem;
              text-align: center;
            }
          }
        }
      }

      span {
        display: block;
        color: ${theme.colors.white};
        line-height: 1;
      }
    `;
  }};
`;

export const Card = styled.div<{ backgroundColor: string }>`
  ${(props) => {
    const { theme, backgroundColor } = props;

    return css`
      position: relative;
      background-color: ${backgroundColor};
      width: 100%;
      min-height: 45rem;
      padding: ${theme.distance.normal}rem;
      border-radius: ${theme.unit + 4}px;
      margin-bottom: 6rem;

      header {
        padding-bottom: 1.5rem;
        border-bottom: 1px solid ${theme.colors.white};
        margin-bottom: 1.5rem;

        h2 {
          font-size: ${theme.typography.size.title_2};
          line-height: 1;
          color: ${theme.colors.white};
        }
      }

      section {
      }
    `;
  }};
`;

export const InformationWrapper = styled.div`
  ${() => {
    return css`
      position: sticky;
      top: 0;
      width: 100%;
      min-height: calc(100vh - (88px + 160px));
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
  }};
`;

export const InformationContainer = styled.section`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 22%;
      padding-left: ${theme.distance.normal}rem;

      ${theme.breakpoints.custom(
        'max',
        1440,
        css`
          width: 20%;
        `
      )}

      ${theme.breakpoints.custom(
        'max',
        1340,
        css`
          width: 40%;
        `
      )}

      ${theme.breakpoints.custom(
        'max',
        1200,
        css`
          width: 35%;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        2200,
        css`
          padding-left: ${theme.distance.stout}rem;
        `
      )}
    `;
  }};
`;

export const StationContent = styled.div<{ backgroundColor: string }>`
  ${(props) => {
    const { theme, backgroundColor } = props;

    return css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      ${Elevation(4)};
      cursor: pointer;

      ${backgroundColor &&
      css`
        background-color: ${backgroundColor};
      `}

      span {
        display: block;
        font-family: ${theme.typography.family.title};
        font-size: ${theme.typography.size.normal};
        color: ${theme.colors.white};
        text-shadow: 1px 1px rgba(0, 0, 0, 0.08);
      }
    `;
  }};
`;

export const Station = styled.div<{
  directionItems: DirectionOfStations;
  isActive: boolean;
}>`
  ${(props) => {
    const { theme, directionItems, isActive = false } = props;

    return css`
      position: relative;
      width: calc((100vw - ${minWidthSidebar}rem) / 14);
      height: calc((100vw - ${minWidthSidebar}rem) / 14);
      min-width: 6.5rem;
      min-height: 6.5rem;
      padding: 0.5rem;
      z-index: 1;

      ${isActive &&
      css`
        border-radius: 4px;
        box-shadow: inset 0 0 0 2px ${theme.colors.grey_1};
      `}

      ${theme.breakpoints.custom(
        'min',
        1024,
        css`
          margin: 0.5rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1550,
        css`
          margin: 0.6rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1700,
        css`
          margin: 1rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1920,
        css`
          max-width: 12rem;
          max-height: 12rem;
        `
      )}

      ${directionItems === 'vertical' &&
      css`
        + div {
          margin-top: 0;
        }
      `}
    `;
  }};
`;

export const Legend = styled.div<{
  numberStations: number;
  directionItems: DirectionOfStations;
}>`
  ${(props) => {
    const { theme, numberStations, directionItems } = props;

    return css`
      position: absolute;
      top: 0;
      width: 100%;

      height: ${numberStations > 1 && directionItems === 'vertical'
        ? `calc(((100vw - ${minWidthSidebar}rem) / 14) * ${numberStations + 1})`
        : `calc(((100vw - ${minWidthSidebar}rem) / 14) * 2)`};

      min-height: ${numberStations > 1 && directionItems === 'vertical'
        ? 6.5 * (numberStations + 1)
        : 6.5 * 2}rem;

      ${theme.breakpoints.custom(
        'min',
        1024,
        css`
          padding: 1rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1550,
        css`
          padding: 1.1rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1700,
        css`
          padding: 1.5rem;
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1920,
        css`
          max-height: ${numberStations > 1 && directionItems === 'vertical'
            ? 11 * (numberStations + 1)
            : 11 * 2}rem;
        `
      )}

      > div {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border-radius: 4px;
        background-color: ${theme.colors.grey_5};

        .station-list__integration-legend {
          font-size: 1.2rem;
          color: rebeccapurple;
        }

        .station-list {
          &__legend {
            display: block;
            font-family: ${theme.typography.family.title};
            line-height: 1.3;
            color: ${theme.colors.grey_1};
            text-align: center;
            padding: 0 1.5rem 1.5rem;

            ${theme.breakpoints.custom(
              'min',
              1024,
              css`
                font-size: 1.2rem;
              `
            )}

            ${theme.breakpoints.custom(
              'min',
              1921,
              css`
                font-size: 1.4rem;
              `
            )}

          ${theme.breakpoints.custom(
              'min',
              2220,
              css`
                font-size: 2.2rem;
              `
            )}
          }

          &__integration {
            position: absolute;
            bottom: -${(theme.unit * 1.5) / 2 - 2}px;
            right: -${(theme.unit * 1.5) / 2 - 2}px;
            width: ${theme.unit * 1.5}px;
            height: ${theme.unit * 1.5}px;
            display: block;
            border-radius: 50%;
            background-color: ${theme.colors.primary_7};
          }
        }
      }
    `;
  }};
`;

export const Group = styled.div<{ directionItems: DirectionOfStations }>`
  ${(props) => {
    const { theme, directionItems } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: ${directionItems === 'horizontal' ? 'row' : 'column'};

      ${directionItems && css``}

      ${theme.breakpoints.custom(
        'max',
        1335,
        css`
          &:last-child {
            margin-top: 0;
          }
        `
      )};
    `;
  }};
`;

export const Row = styled.div<{ line: Buildings }>`
  ${(props) => {
    const { theme, line } = props;

    return css`
      position: relative;
      display: flex;
      justify-content: center;
      padding-right: 4rem;

      ${theme.breakpoints.custom(
        'max',
        1340,
        css`
          justify-content: flex-start;
        `
      )};

      &:not(:last-child) {
        padding-bottom: 2rem;
      }

      ${line === 'line_h' &&
      css`
        &:first-child {
          padding-bottom: 9rem;
          margin-bottom: 1rem;

          ${theme.breakpoints.custom(
            'max',
            1440,
            css`
              padding-bottom: 6rem;
              margin-bottom: 1rem;
            `
          )};

          :before {
            content: '';
            position: absolute;
            bottom: 15px;
            left: 15px;
            width: calc(100% - 50px);
            height: 1px;
            background-color: ${theme.colors.grey_4};

            ${theme.breakpoints.custom(
              'max',
              1480,
              css`
                background-color: transparent;
              `
            )}
          }

          + div {
            &:before {
              content: '';
              position: absolute;
              bottom: 1rem;
              left: 0;
              width: calc(50% - 24px);
              height: calc(100% + 1.5rem);
              border-radius: 4px;
              background-color: ${theme.colors.white};
              z-index: -1;
            }

            &:after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: calc(50% + 15px);
              height: calc(100% + 1.5rem);
              border-radius: 4px;
              background-color: ${theme.colors.white};
              z-index: -1;
            }

            &:before,
            &:after {
              ${theme.breakpoints.custom(
                'max',
                1480,
                css`
                  background-color: transparent;
                `
              )}
            }
          }

          .station-list {
            &__name {
              span {
                margin-bottom: 1rem;
              }
            }
          }
        }

        &:last-child {
          padding-top: 3rem;

          .station-list {
            &__name {
              span {
                margin-bottom: 4rem;
              }
            }
          }

          :before {
            content: '';
            position: absolute;
            top: 15px;
            left: 15px;
            width: calc(100% - 50px);
            height: 1px;
            background-color: ${theme.colors.grey_4};

            ${theme.breakpoints.custom(
              'max',
              1480,
              css`
                background-color: transparent;
              `
            )}
          }
        }

        &:nth-child(2) {
          padding-bottom: 3rem;

          ${theme.breakpoints.custom(
            'max',
            1440,
            css`
              padding-bottom: 2rem;
            `
          )};

          ${theme.breakpoints.custom(
            'min',
            1921,
            css`
              padding-bottom: 4rem;
            `
          )}
        }

        &:nth-child(3) {
          ${theme.breakpoints.custom(
            'max',
            1440,
            css`
              padding-bottom: 8rem;
            `
          )};
        }

        &:nth-child(4) {
          ${theme.breakpoints.custom(
            'max',
            1440,
            css`
              padding-bottom: 0;
              margin-bottom: 0;
            `
          )};
        }

        &:first-child,
        &:last-child {
          background-color: ${theme.colors.white};
          border-radius: 4px;

          ${theme.breakpoints.custom(
            'max',
            1480,
            css`
              background-color: transparent;
            `
          )}
        }

        .station-list {
          &__name {
            position: absolute;
            right: 0;
            width: 4rem;
            height: 100%;
            display: flex;
            align-items: center;

            span {
              transform: rotate(180deg);
              writing-mode: vertical-rl;
              text-orientation: mixed;
              font-size: ${theme.typography.size.normal};
              opacity: 1;
              ${Transition('opacity', 0.3)}

              ${theme.breakpoints.custom(
                'max',
                1480,
                css`
                  opacity: 0;
                `
              )}

            ${theme.breakpoints.custom(
                'min',
                1921,
                css`
                  font-size: ${theme.typography.size.big};
                `
              )}

            ${theme.breakpoints.custom(
                'min',
                2000,
                css`
                  font-size: ${theme.typography.size.huge};
                `
              )}
            }
          }
        }
      `}
    `;
  }};
`;

export const StationsContainer = styled.section`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 78%;
      padding-right: ${theme.distance.normal}rem;
      ${Transition('width', 0.3)}

      ${theme.breakpoints.custom(
        'max',
        1440,
        css`
          padding-right: 0;
          width: 80%;
        `
      )};

      ${theme.breakpoints.custom(
        'max',
        1340,
        css`
          width: 60%;
        `
      )};

      ${theme.breakpoints.custom(
        'max',
        1200,
        css`
          width: 65%;
          overflow-x: auto;
          ${CustomScrollBar(theme.colors.grey_3, false)}
        `
      )};
    `;
  }};
`;

export const StationList = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 0 ${theme.distance.normal}rem;
      display: flex;
    `;
  }};
`;
