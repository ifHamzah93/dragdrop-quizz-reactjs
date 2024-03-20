export interface Solution {
  image: string;
  text?: string;
  attribution?: string;
}

export interface Result extends Solution {
  title: string;
}

export type RefObj = {
  current: HTMLDivElement | null;
};

export interface RefObjArray {
  current: HTMLDivElement[];
}

export interface DragItemTypes {
  item: string;
  cardIndex: number;
  dropConstraintsRef: RefObjArray;
  dropPositions: number[];
  setDropPosition: Function;
}
