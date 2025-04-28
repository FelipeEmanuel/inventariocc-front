import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationPT from './assets/translation.json'
import { ptBR } from '@mui/material/locale'

export enum LanguageOptions {
    PT_BR = 'pt-BR'
}

export const MAP_ENUM_TO_LANGUAGE = {
    [LanguageOptions.PT_BR]: 'pt'
}

export const parseStringToEnumLanguage = (value: string): LanguageOptions => {
    switch (value) {
        case 'pt-BR':
            return LanguageOptions.PT_BR

        default:
            return LanguageOptions.PT_BR
    }
}

export const MAP_LANGUAGE_TO_ENUM = {
    'pt': [LanguageOptions.PT_BR]
}

export const MAP_ENUM_TO_LOCALE = {
    [LanguageOptions.PT_BR]: ptBR
}

const resources = {
    pt: {
        translation: translationPT
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        lng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        interpolation: {
            escapeValue: false
        },
        react: {
            bindI18n: 'languageChanged'
        }
    })

export default i18n