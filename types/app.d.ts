declare interface InitDataType {
  dataTemplate?: Data[];
  arrDataNewForm?: DataNewForm[];
  nameTypeSelectForm?: string;
  inputNameFormStore?: string;
  inputFile?: string;
}

declare interface Data {
  id?: string;
  name?: string;
  isSelect?: boolean;
  url_image?: string;
  type?: string;
}
