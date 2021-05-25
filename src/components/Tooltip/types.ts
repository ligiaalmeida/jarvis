/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */
export type TooltipProps<Node> = {
  description: string | Node;
  xPosition?: string;
  yPosition?: string;
  bgColorIcon?: string;
  classNameContainerTooltip?: string;
  classNameContainerIcon?: string;
};

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */

export type ContainerTooltipProps = {
  countCharacters?: number;
};

export type ContainerAttrs = {
  classNameContainerIcon?: string;
  classNameContainerTooltip?: string;
};
