import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface MatrixContainerProps {
  label: String;
  children: React.ReactNode;
}

export interface SidebarProps {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  children: React.ReactNode;
}

export interface InputTaskCountProps {
  taskCount: number
  setTaskCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface InputChanceProps {
  chance: number
  setChance: React.Dispatch<React.SetStateAction<number>>;
}

export interface MatrixRenderProps {
  matrix: number[][];
}

export interface MatrixProps {
  row: number;
  col: number;
}

export interface MatrixInputProps {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

export interface EdgeProps {
  start: number;
  end: number;
}