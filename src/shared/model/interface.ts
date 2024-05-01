export interface IComment {
    deleted?: true;
    by?: string;
    id: number;
    kids?: number[];
    parent: number;
    text?: string;
    time: EpochTimeStamp;
    type: 'comment';
}
export interface IArticle {
    by: string;
    descendants: number;
    id: number;
    score: number;
    time: EpochTimeStamp;
    title: string;
    type: string;
    url: string;
    kids?: number[];
}
