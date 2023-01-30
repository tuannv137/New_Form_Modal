declare interface InitDataType {
  dataTemplate?: Data[];
  dataNewForm?: Data[];
  nameTypeSelectForm?: "type-1" | "type-2" | "type-3" | "type-4" | string;
  inputNameFormStore?: string;
  objFile?: { inputFile?: string; typeFile?: string };
  inputSearchForm?: string;
}

declare interface Data {
  id?: string;
  name?: string;
  isSelect?: boolean;
  url_image?: string;
  type?: string;
  fieldForm?: (Data | undefined)[];
  fileImport?: string;
  data?: string;
}

declare interface DATA_UI {
  value?: string;
  label?: string;
  groupOptions?: DATA_UI[];
  level?: number;
  path?: string;
  isGroup?: boolean;
}
