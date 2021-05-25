import styled, { css } from 'styled-components';

export const Ring = styled.div<{ colorRing?: string; widthRing?: number; borderWidthRing?: number }>`
  ${(props) => {
    const { colorRing = '#fff', widthRing = 80, borderWidthRing = 4 } = props;

    return css`
      position: relative;
      width: ${widthRing}px;
      height: ${widthRing}px;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        position: absolute;
        box-sizing: border-box;
        display: block;
        width: ${widthRing - 8}px;
        height: ${widthRing - 8}px;
        border: ${borderWidthRing}px solid ${colorRing};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${colorRing} transparent transparent transparent;
      }

      div:nth-child(1) {
        animation-delay: -0.45s;
      }

      div:nth-child(2) {
        animation-delay: -0.3s;
      }

      div:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }};
`;
