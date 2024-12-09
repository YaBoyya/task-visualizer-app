import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface MatrixContainerProps {
  label: String;
  children: React.ReactNode;
}

export interface SidebarProps {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  onSubmitClick: () => void,
  children: React.ReactNode;
}

export interface InputProps {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export interface MatrixRenderProps {
  matrix: number[][];
}

export interface MatrixProps {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

export interface EdgeProps {
  start: number;
  end: number;
}

export type ChartSeriesParams = { name: string; data: { x: string; y: number[]; }[]; }[][];