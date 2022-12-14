export default interface ProjectType {
  id: number;
  title: string;
  description: string;
  stage: string;
  logoUrl: string;
  website: string;
  discord: string;
  github: string;
  telegram: string;
  summary: string;
  startDate: string;
  involvement: string;
  guide: string;
  onGoing: boolean;
}

export type AddProjectType = Omit<ProjectType, "id" | "logoUrl"> & {
  logo: File | null;
};

export type EditProjectType = ProjectType & {
  logo: File | null;
};