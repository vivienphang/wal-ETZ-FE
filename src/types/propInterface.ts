import React from "react";
import {
  accountRecordsInterface,
  singularAccountInterface,
} from "./accountReducerInterface";
import { filterInterface } from "./filterInterface";

export interface accountListPropInterface {
  acc: string;
  setAcc: React.Dispatch<React.SetStateAction<string>>;
}

export interface filterPropInterface {
  filters: filterInterface;
  setFilters: React.Dispatch<React.SetStateAction<filterInterface>>;
}

export interface recordsListPropInterface {
  filteredRec: accountRecordsInterface[];
  accSymbol: string;
  setChosenRec: React.Dispatch<React.SetStateAction<accountRecordsInterface>>;
  onOpen: () => void;
}

export interface categoryPropInterface {
  isExpense: boolean;
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  isAddRecord: boolean;
  isDisabled: boolean;
}

export interface allAccDisplayPropInterface {
  chosenAcc?: string;
  setChosenAcc: React.Dispatch<React.SetStateAction<string>>;
}

export interface EIPieChartPropInterface {
  recs?: accountRecordsInterface[];
}

export interface addRecordPropInterface {
  onClose: () => void;
}

export interface addPhotoUrlPropInterface {
  isPhotoUploaded?: File;
  setIsPhotoUploaded: React.Dispatch<React.SetStateAction<File>>;
}
export interface viewRecordPropInterface {
  currentAcc: singularAccountInterface;
  chosenRec: accountRecordsInterface;
  onClose: () => void;
}
