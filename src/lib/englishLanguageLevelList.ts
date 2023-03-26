export interface EnglishLanguageLevelOption {
  code: string
  english: string
  japanese: string
}

export const englishLanguageLevelOptions: EnglishLanguageLevelOption[] = [
  { code: "beginner", english: "Beginner", japanese: "Beginner" },
  {
    code: "conversational",
    english: "Conversational",
    japanese: "Conversational",
  },
  { code: "business", english: "Business level", japanese: "Business level" },
  { code: "fluent", english: "Fluent", japanese: "Fluent" },
  { code: "native", english: "Native", japanese: "Native" },
]
