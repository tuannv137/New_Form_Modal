declare interface InitDataType {
  dataTemplate?: Data[];
  arrDataNewForm?: Data[];
  arrFormSelect?: Data[];
  nameTypeSelectForm?: string;
  inputNameFormStore?: string;
  inputFile?: string;
  inputSearchForm?: string;
}

declare interface Data {
  id?: string;
  name?: string;
  isSelect?: boolean;
  url_image?: string;
  type?: string;
  fieldForm?: (Data | undefined)[];
}
