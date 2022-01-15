import React, { createContext, useCallback, useContext, useState } from 'react';

export interface IWrapperProps {
  id: string;
  cubicle_ids: string[];
  index_start: number;
  index_end: number;
  cod: string;
  depth: number;
  width: number;
  height: number;
  frontal_view: string;
}

interface IWrapperContext {
  wrappers: IWrapperProps[];
  resetWrappers: () => void;
  addWrapper(positionWrappers: IWrapperProps | IWrapperProps[]): void;
  deleteWrapper(position: number): void;
}

const WrapperContext = createContext<IWrapperContext>({} as IWrapperContext);

export const WrapperProvider: React.FC = ({ children }) => {
  const [wrappers, setWrappers] = useState<IWrapperProps[]>([]);

  const addWrapper = useCallback(
    (positionWrappers: IWrapperProps | IWrapperProps[]) => {
      if (Array.isArray(positionWrappers)) {
        setWrappers(positionWrappers);
      } else {
        if (wrappers.length === 0) {
          setWrappers(oldState => [...oldState, positionWrappers]);
          return;
        }

        let newWrapper = wrappers.slice();
        newWrapper.push(positionWrappers);
        newWrapper = newWrapper.sort((a, b) => a.index_start - b.index_start);
        setWrappers(newWrapper);
      }
    },
    [wrappers],
  );

  const deleteWrapper = useCallback(
    (position: number) => {
      setWrappers(wrappers.filter((_, index) => index !== position));
    },
    [wrappers],
  );

  const resetWrappers = useCallback(() => {
    setWrappers([]);
  }, []);

  return (
    <WrapperContext.Provider
      value={{
        wrappers,
        resetWrappers,
        deleteWrapper,
        addWrapper,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};

export function useWrapper(): IWrapperContext {
  const context = useContext(WrapperContext);
  return context;
}
