export type MessageProps<Node> = {
  isVisible: boolean;
  icon: Node;
  title: string;
  description: string | Node;
};
