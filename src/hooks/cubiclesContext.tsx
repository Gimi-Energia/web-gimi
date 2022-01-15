import React, { createContext, useCallback, useContext, useState } from 'react';
import createGroupInArray from '../utils/createGroupInArray';

export interface ICubicleProps {
  id: string;
  cod: string;
  codeTransitionBox: string;
  name: string;
  initials: string;
  classification_name: string;
  classification_code: number;
  input_side: string;
  width_cubicle: number;
  height_cubicle: number;
  base_view_url: string;
  external_view_url: string;
  inside_view_url: string;
  single_line_diagram_url: string;
  lightning_rod: number;
  capacitive_isolator: number;
  spare_cable: number;
  voltage: number;
  current: number;
  variable: number;
  box_cubicle: string;
  box_single_line: string;
  left_cut_url: string;
  right_cut_url: string;
  description: string;
}

// interface ICutViewProps {
//   code: number;
//   name: string;
//   leftCutUrl: string | undefined;
//   rightCutUrl: string | undefined;
//   wrapperCutUrl?: string;
//   transitionBoxCutUrl?: string;
// }

export interface ICutViewProps {
  cod: string;
  name: string;
  cutUrl: string | undefined;
  height: number;
  side: string;
  wrapperCutUrl?: string;
  transitionBoxCutUrl?: string;
}

interface ICubicleContext {
  cubicles: ICubicleProps[];
  cutViews: ICutViewProps[];
  cutViewsFormatted: ICutViewProps[][];
  addCubicle: (cubicle: ICubicleProps, inputSide: 'left' | 'right') => void;
  deleteCubicle: (id: string) => void;
  updateCubicles: (modifyCubicles: ICubicleProps[]) => void;
  updateCutViews: (modifyCutViews: ICutViewProps[]) => void;
  updateDescription: (description: string, position: number) => void;
}

const CubicleContext = createContext<ICubicleContext>({} as ICubicleContext);

export const CubicleProvider: React.FC = ({ children }) => {
  const [cutViewsFormatted, setCutViewsFormatted] = useState<ICutViewProps[][]>(
    [
      [
        //   {
        //     name: 'NEW PICCOLO',
        //     code: 9,
        //     cutUrl:
        //       'http://192.168.14.100:3333/tmp/ab6f46499e6ef0c9cee1-NP9-CORTE-ESQ.svg',
        //     side: 'left',
        //     height: 2000,
        //   },
        //   {
        //     name: 'NEW PICCOLO',
        //     code: 9,
        //     cutUrl:
        //       'http://192.168.14.100:3333/tmp/5b7bd111c2df1b27b3c0-NP9-CORTE-DIR.svg',
        //     side: 'right',
        //     height: 2000,
        //   },
        // ],
        // [
        //   {
        //     name: 'NEW PICCOLO',
        //     code: 8,
        //     cutUrl:
        //       'http://192.168.14.100:3333/tmp/8990f79a7f1b1688f80a-NP8-C.svg',
        //     side: 'right',
        //     height: 1700,
        //   },
        //   {
        //     name: 'NEW PICCOLO',
        //     code: 2,
        //     cutUrl:
        //       'http://192.168.14.100:3333/tmp/8990f79a7f1b1688f80a-NP8-C.svg',
        //     side: 'right',
        //     height: 1700,
        //   },
      ],
    ],
  );
  const [cubicles, setCubicles] = useState<ICubicleProps[]>([
    // {
    //   box_cubicle: 'NULL',
    //   box_single_line: 'NULL',
    //   codeTransitionBox: 'NULL',
    //   description: 'SAÍDA',
    //   id: 'c016a9ad-d88c-4a99-ab43-dbd7cbac9423',
    //   name: 'NEW PICCOLO',
    //   initials: 'NP',
    //   classification_name: 'SAÍDA',
    //   classification_code: 9,
    //   input_side: 'Esquerda',
    //   lightning_rod: 1,
    //   capacitive_isolator: 1,
    //   spare_cable: 0,
    //   voltage: 0,
    //   current: 0,
    //   variable: 1,
    //   width_cubicle: 750,
    //   height_cubicle: 2000,
    //   external_view:
    //     'http://192.168.14.100:3333/tmp/6d596897921c1389513e-NP9-VE.svg',
    //   inside_view:
    //     'http://192.168.14.100:3333/tmp/93f21df38e30994ef626-NP9-VI.svg',
    //   single_line_diagram:
    //     'http://192.168.14.100:3333/tmp/92fa0161b16013c44e3e-NP8-UNIFILAR.svg',
    //   left_cut:
    //     'http://192.168.14.100:3333/tmp/ab6f46499e6ef0c9cee1-NP9-CORTE-ESQ.svg',
    //   right_cut:
    //     'http://192.168.14.100:3333/tmp/5b7bd111c2df1b27b3c0-NP9-CORTE-DIR.svg',
    //   base_view:
    //     'http://192.168.14.100:3333/tmp/55e59e51b4ecad1f2056-NP9-BASE.svg',
    // },
    // {
    //   box_cubicle: 'NULL',
    //   box_single_line: 'NULL',
    //   codeTransitionBox: 'NULL',
    //   description: 'SAÍDA',
    //   id: 'ef1ff868-87d0-4e1c-9072-4a54b1b09149',
    //   name: 'NEW PICCOLO',
    //   initials: 'NP',
    //   classification_name: 'saida',
    //   classification_code: 8,
    //   input_side: 'Esquerda',
    //   lightning_rod: 1,
    //   capacitive_isolator: 1,
    //   spare_cable: 0,
    //   voltage: 0,
    //   current: 0,
    //   variable: 1,
    //   width_cubicle: 600,
    //   height_cubicle: 1700,
    //   external_view:
    //     'http://192.168.14.100:3333/tmp/7621cc4140a36af1491a-NP8-VE.svg',
    //   inside_view:
    //     'http://192.168.14.100:3333/tmp/fced987757b2c0d8e47e-NP8-VI.svg',
    //   single_line_diagram:
    //     'http://192.168.14.100:3333/tmp/bb5ce0f3d8d19f75d69c-NP8-UNIFILAR.svg',
    //   left_cut: 'null',
    //   right_cut:
    //     'http://192.168.14.100:3333/tmp/8990f79a7f1b1688f80a-NP8-C.svg',
    //   base_view:
    //     'http://192.168.14.100:3333/tmp/ed8ebaa5429e46107fe9-NP8-B.svg',
    // },
  ]);
  const [cutViews, setCutViews] = useState<ICutViewProps[]>([
    // {
    //   name: 'NEW PICCOLO',
    //   code: 9,
    //   cutUrl:
    //     'http://192.168.14.100:3333/tmp/ab6f46499e6ef0c9cee1-NP9-CORTE-ESQ.svg',
    //   side: 'left',
    // },
    // {
    //   name: 'NEW PICCOLO',
    //   code: 9,
    //   cutUrl:
    //     'http://192.168.14.100:3333/tmp/5b7bd111c2df1b27b3c0-NP9-CORTE-DIR.svg',
    //   side: 'right',
    // },
    // {
    //   name: 'NEW PICCOLO',
    //   code: 8,
    //   cutUrl: 'http://192.168.14.100:3333/tmp/8990f79a7f1b1688f80a-NP8-C.svg',
    //   side: 'right',
    // },
    // {
    //   name: 'NEW PICCOLO',
    //   code: 2,
    //   cutUrl: 'http://192.168.14.100:3333/tmp/8990f79a7f1b1688f80a-NP8-C.svg',
    //   side: 'right',
    // },
  ]);

  const updateDescription = useCallback(
    (description: string, position: number) => {
      const newDescription = cubicles.map((cubicle, index) => {
        if (index !== position) {
          return cubicle;
        }

        return {
          ...cubicle,
          description,
        };
      });

      setCubicles(newDescription);
    },
    [cubicles],
  );

  const updateCutViews = useCallback((modifyCutViews: ICutViewProps[]) => {
    setCutViews(modifyCutViews);
    setCutViewsFormatted(createGroupInArray(modifyCutViews));
  }, []);

  const updateCubicles = useCallback((modifyCubicles: ICubicleProps[]) => {
    setCubicles(modifyCubicles);
  }, []);

  const addCubicle = useCallback(
    (cubicle: ICubicleProps, inputSide: 'left' | 'right') => {
      if (!cutViews.find(cutView => cutView.cod === cubicle.cod)) {
        const cutViewsPreper = cutViews.slice();

        if (cubicle.right_cut_url) {
          const addCutView = {
            cod: cubicle.cod,
            name: cubicle.name,
            cutUrl: cubicle.right_cut_url,
            side: 'right',
            height: cubicle.height_cubicle,
          };
          cutViewsPreper.push(addCutView);
        }

        if (cubicle.left_cut_url) {
          const addCutView = {
            cod: cubicle.cod,
            name: cubicle.name,
            cutUrl: cubicle.left_cut_url,
            side: 'left',
            height: cubicle.height_cubicle,
          };
          cutViewsPreper.push(addCutView);
        }
        setCutViews(cutViewsPreper);
        const formatCutView = createGroupInArray(cutViewsPreper);
        setCutViewsFormatted(formatCutView);
      }

      if (inputSide === 'left') {
        setCubicles(oldState => [...oldState, cubicle]);
      } else {
        setCubicles(oldState => [cubicle, ...oldState]);
      }
    },
    [cutViews],
  );

  const deleteCubicle = useCallback(
    (id: string) => {
      const productWillDelete = cubicles.find(cubicle => cubicle.id === id);
      const cubiclesFilter = cubicles.filter(cubicle => cubicle.id !== id);

      if (productWillDelete) {
        // Verifica se existe algum cubiculo com o mesmo id para saber se pode excluir da vista do corte
        if (
          !cubiclesFilter.some(cubicle => cubicle.cod === productWillDelete.cod)
        ) {
          let newCutViews = cutViews.slice();

          newCutViews = newCutViews.filter(
            cutView => cutView.cod !== productWillDelete.cod,
          );
          setCutViews(newCutViews);
          const formatCutView = createGroupInArray(newCutViews);
          setCutViewsFormatted(formatCutView);
        }
      }

      setCubicles(cubicles.filter(cubicle => cubicle.id !== id));
    },
    [cubicles, cutViews],
  );

  return (
    <CubicleContext.Provider
      value={{
        cubicles,
        cutViews,
        addCubicle,
        deleteCubicle,
        updateCubicles,
        updateCutViews,
        updateDescription,
        cutViewsFormatted,
      }}
    >
      {children}
    </CubicleContext.Provider>
  );
};

export function useCubicle(): ICubicleContext {
  const context = useContext(CubicleContext);
  return context;
}
