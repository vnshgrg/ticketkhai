export interface VisaStatusOption {
  status: string
  english: string
  japanese: string
}

// Country names object using 3-letter country codes to reference country name
// ISO 3166 Alpha-3 Format: [3 letter Country Code]: [Country Name]
// Sorted alphabetical by country name (special characters on bottom)
export const visaStatusOptions: VisaStatusOption[] = [
  
  {
    status: "dependent",
    english: "Dependent",
    japanese: "家族滞在",
  },
  {
    status: "student",
    english: "Student",
    japanese: "留学生",
  },
  {
    status: "skilled-worker",
    english: "Skilled Worker",
    japanese: "技能",
  },
  {
    status: "engineer",
    english: "Engineer / Specialist in Humanities / Int'l Services",
    japanese: "技術・人文知識・国際業務",
  },{
    status: "permanent-resident",
    english: "Permanent Resident",
    japanese: "永住者",
  },
  {
    status: "long-term-resident",
    english: "Long Term Resident",
    japanese: "定住者",
  },
  {
    status: "spouse-of-japanese-national",
    english: "Spouse of a Japanese National",
    japanese: "日本人の配偶者",
  },
  {
    status: "ssw-1",
    english: "Specified Skilled Worker 1 (SSW1)",
    japanese: "特定技能1号",
  },
  {
    status: "ssw-2",
    english: "Specified Skilled Worker 2 (SSW1)",
    japanese: "特定技能2号",
  },
  {
    status: "hsp-1",
    english: "Highly Skilled Professional 1 (HSP1)",
    japanese: "高度専門職1号",
  },
  {
    status: "hsp-2",
    english: "Highly Skilled Professional 2 (HSP2)",
    japanese: "高度専門職2号",
  },
  {
    status: "care-worker",
    english: "Care Worker",
    japanese: "介護",
  },
]
