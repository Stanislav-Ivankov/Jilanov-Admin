export default interface FileInfo {
    id: number;
    type: string;
    name: string;
    size: number;
    progress: number;
    userId: string;
    link: string;
    uploaded: boolean;
}