import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Icons} from 'constant';
import I18n from 'languages/i18n';

interface ILanguage {
  code: string;
  name: string;
  icons: any;
}

interface IinitialState {
  activeLanguage: ILanguage;
  listLanguage: Array<ILanguage>;
  I18nState: 'en' | 'vi';
}

const initialState = {
  activeLanguage: {
    code: 'vi',
    name: 'Vie',
    icons: Icons.vietnam,
  },
  listLanguage: [
    {
      code: 'vi',
      name: 'Vie',
      icons: Icons.vietnam,
    },
    {
      code: 'en',
      name: 'Eng',
      icons: Icons.english,
    },
  ],
  I18nState: 'en',
} as IinitialState;

const languages = createSlice({
  name: `language@change`,
  initialState: initialState,
  reducers: {
    // change language
    changeLanguage(state, action: PayloadAction<ILanguage>) {
      I18n.locale = action.payload.code;
      state.I18nState = action.payload.code;
      state.activeLanguage = action.payload;
    },
  },
  extraReducers: builder => {},
});

const {actions, reducer} = languages;
export const {changeLanguage} = actions;
export default reducer;
