export default interface ProjectType {
    id: number | undefined;
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