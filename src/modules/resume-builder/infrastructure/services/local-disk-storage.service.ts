import fs from "fs/promises";
import path from "path";
import { IStorageService } from "../../domain/ports/storage-service.interface";

export class LocalDiskStorageService implements IStorageService {
  async upload(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    return `/uploads/${uniqueFileName}`;
  }
}
