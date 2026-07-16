export interface IStorageService {
  upload(file: File): Promise<string>;
}
