declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

declare const module: any;

/**
 * sobrevescrevendo a interface do ConnectedRouterProps para acrescentar
 * children. Em acordo com a nova versão do React 18.2.0
 */
declare module 'connected-react-router' {
  interface ConnectedRouterProps<S = LocationState> {
    history: History<S>;
    context?: React.Context<ReactReduxContextValue>;
    noInitialPop?: boolean;
    noTimeTravelDebugging?: boolean;
    omitRouter?: boolean;
    children?: React.ReactNode | React.ReactNode[]; // according new version react
  }
}
