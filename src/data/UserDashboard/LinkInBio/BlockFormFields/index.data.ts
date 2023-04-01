import {
  LinkInBioFormFieldsEnum,
  linkInBioFromFieldItemInterface,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

const LinkInBioFormTitleFiled: linkInBioFromFieldItemInterface = {
  title: 'New form 👋',
  type: LinkInBioFormFieldsEnum.title,
};

const LinkInBioFormEmailFiled: linkInBioFromFieldItemInterface = {
  columnId: 'email',
  placeholder: 'Email',
  type: LinkInBioFormFieldsEnum.email,
};

const LinkInBioFormFirstNameFiled: linkInBioFromFieldItemInterface = {
  columnId: 'firstName',
  placeholder: 'First Name',
  type: LinkInBioFormFieldsEnum.firstName,
};

const LinkInBioFormLastNameFiled: linkInBioFromFieldItemInterface = {
  columnId: 'lastName',
  placeholder: 'Last Name',
  type: LinkInBioFormFieldsEnum.lastName,
};

const LinkInBioFormPhoneFiled: linkInBioFromFieldItemInterface = {
  columnId: 'tel',
  placeholder: 'Phone',
  type: LinkInBioFormFieldsEnum.phone,
};

const LinkInBioFormTextFiled: linkInBioFromFieldItemInterface = {
  columnId: 'text-field',
  placeholder: 'Text',
  type: LinkInBioFormFieldsEnum.text,
};

const LinkInBioFormDateFiled: linkInBioFromFieldItemInterface = {
  columnId: 'date',
  placeholder: 'Date',
  type: LinkInBioFormFieldsEnum.date,
};

const LinkInBioFormWebsiteFiled: linkInBioFromFieldItemInterface = {
  columnId: 'url',
  placeholder: 'Website',
  type: LinkInBioFormFieldsEnum.website,
};

export const linkInBioFormFieldsDefaultData: {
  [key: string]: linkInBioFromFieldItemInterface;
} = {
  [LinkInBioFormFieldsEnum.date]: LinkInBioFormDateFiled,
  [LinkInBioFormFieldsEnum.email]: LinkInBioFormEmailFiled,
  [LinkInBioFormFieldsEnum.firstName]: LinkInBioFormFirstNameFiled,
  [LinkInBioFormFieldsEnum.lastName]: LinkInBioFormLastNameFiled,
  [LinkInBioFormFieldsEnum.phone]: LinkInBioFormPhoneFiled,
  [LinkInBioFormFieldsEnum.text]: LinkInBioFormTextFiled,
  [LinkInBioFormFieldsEnum.title]: LinkInBioFormTitleFiled,
  [LinkInBioFormFieldsEnum.website]: LinkInBioFormWebsiteFiled,
};
