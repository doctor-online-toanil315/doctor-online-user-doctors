export interface BaseSurveyType {
  title: string;
  description: string;
  surveyLink: string;
  resultLink: string;
}

export interface AddSurveyType extends BaseSurveyType {}

export interface SurveyType extends BaseSurveyType {
  id: string;
  createdAt: string;
}
