import styled, { css } from 'styled-components';
import { Transition, Elevation } from 'utils/styles/mixins';

export const SuggestedItem = styled.tr<{
  sequence: boolean;
}>`
  ${(props) => {
    const { theme, sequence } = props;

    return css`
      position: relative;

      ${sequence &&
      css`
        &.suggested__new-sequence {
          background-color: ${theme.colors.primary_1};

          td {
            color: ${theme.colors.white};
            &:nth-child(4) span,
            &:nth-child(5) span {
              color: ${theme.colors.white};
            }
          }
        }
      `}
    `;
  }};
`;

export const Table = styled.table<TableTypeProps>`
  ${(props) => {
    const { theme, type } = props;

    return css`
      position: relative;
      border-collapse: collapse;
      width: calc(100% + 1px);

      thead,
      tbody {
        width: 100%;
      }

      thead {
        tr {
          color: ${theme.colors.white};
          background-color: ${theme.colors.grey_3};
        }

        td {
          font-size: 2rem;
          padding: 1rem;
        }
      }

      tbody {
        tr {
          background-color: rgba(0, 0, 0, 0);
          ${Transition('background-color', 0.3)};

          :focus {
            outline: none;
            background-color: ${theme.colors.primary_2};
            ${Transition('background-color')};

            td {
              color: ${theme.colors.white};
            }
          }

          td {
            position: relative;
            height: 5rem;
            overflow: hidden;
            ${Transition('color', 0.2)};

            :nth-child(1) {
              span {
                position: relative;
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;

                :before {
                  content: '';
                  position: absolute;
                  top: 1px;
                  left: 1px;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  background-color: rgba(0, 0, 0, 0);
                  z-index: -1;
                  ${Transition()};
                }
              }
            }

            :after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 101%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0);
              ${Transition('background-color')};
            }
          }

          :hover {
            td {
              :after {
                pointer-events: none;
              }
            }
          }

          &.selected {
            background-color: ${theme.colors.primary_2};

            td {
              color: ${theme.colors.white};

              :nth-child(1) {
                font-weight: bold;

                span {
                  color: ${theme.colors.grey_1};

                  :before {
                    background-color: ${theme.colors.white};
                    ${Elevation(3)}
                  }
                }
              }

              span {
                color: ${theme.colors.white};
              }
            }
          }
        }

        td {
          padding: 1rem;
          font-size: 1.6rem;
          color: ${theme.colors.grey_1};

          :nth-child(1) {
            width: 6%;
          }

          ${type === 'suggested' &&
          css`
            :nth-child(4),
            :nth-child(5) {
              span {
                font-weight: bold;
                color: ${theme.colors.grey_1};
              }
            }
          `}
        }
      }

      td {
        :nth-child(1) {
          width: 15%;
          padding: 1rem 1rem 1rem 4rem;
        }

        :nth-child(2) {
          width: 20%;
        }

        :nth-child(3) {
          text-align: left;
          width: 65%;
        }
      }
    `;
  }};
`;

export const Header = styled.div<TableTypeProps>`
  ${(props) => {
    const { theme, type } = props;

    return css`
      position: relative;
      min-height: 10rem;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 2rem 2rem 2rem 4rem;
      color: ${theme.colors.white};

      ${type === 'scheduled'
        ? css`
            background-color: ${theme.colors.primary_1};
          `
        : css`
            background-color: ${theme.colors.primary_2};
          `};

      div.header {
        &__wrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          &__items-left {
            display: flex;
            flex-direction: ${type === 'scheduled' ? 'column' : 'row'};
            justify-content: flex-end;
            text-align: right;

            > div span,
            > span {
              display: block;
              padding: 0 1rem;
              font-size: 1.6rem;
              color: ${theme.colors.white};

              + span {
                font-family: 'DaimlerBold', sans-serif;
                font-size: 2.4rem;
              }
            }

            > div {
              + div {
                margin-left: 4rem;
              }
            }

            span {
              display: block;
            }
          }
        }
      }

      > div:nth-child(1) {
        h2 {
          font-size: 2.5rem;
          font-family: 'DaimlerBold', sans-serif;
        }
      }

      > div:nth-child(2) {
        h2 {
          font-size: 1.5rem;
          font-family: 'DaimlerRegular', sans-serif;
          font-weight: normal;
        }
      }
    `;
  }};
`;

export const Container = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      border-collapse: collapse;
      width: 50%;
      overflow: hidden;

      ${theme.breakpoints.default('max').md(css`
        width: 100%;
      `)}

      * {
        user-select: none;
      }
    `;
  }};
`;
