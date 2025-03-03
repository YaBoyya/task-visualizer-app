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
  onSubmitClick: () => void;
  children: React.ReactNode;
}

export interface InputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export interface SelectProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface NumberInputProps {
  label: string;
  value: number;
  callback: Function;
  step?: number
}

export interface ErrorMessageProps {
  msg: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
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

export interface TaskProps {
  baseTask: number;
  name: string;
  p: number;
  a: number;
  D: number;
  q: number;
  taskPriority: number;
  criticalTaskTimes: number;
  maxVerticesToTask: number;
  additionalTask: boolean;
}

export interface ChartDataProps {
  x: string;
  y: number[];
}

export interface ChartResponseProps {
  name: String;
  data: ChartDataProps[];
}

export interface TimelineChartProps {
  onClick: Function;
  chartSeries: ChartSeriesParams;
}

export type TaskExamplesType = {
  [key: string]: {
    taskGraph: number[][];
    taskSpecification: number[][];
    taskCount: number;
    processorCount: number;
  }
}

export type ChartSeriesParams = { name: string; data: { x: string; y: number[]; }[]; }[][];