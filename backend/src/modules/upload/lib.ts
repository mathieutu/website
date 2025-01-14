import fs from "fs";
import Crypto from "crypto";
import { MultipartFile } from "fastify-multipart";
import Sharp from "sharp";

export async function processImage(file: MultipartFile, options: { fileName: string; path: string; size: number }): Promise<void> {
    if (!fs.existsSync(options.path)) {
        fs.mkdirSync(options.path, { recursive: true });
    }

    await Sharp(file.filepath)
        .resize(options.size)
        .toFile(`${ options.path }/${ options.fileName }`);
}

export async function moveFile(file: MultipartFile, options: {fileName: string; path: string}): Promise<void> {
    if (!fs.existsSync(options.path)) {
        fs.mkdirSync(options.path, { recursive: true });
    }

    fs.copyFileSync(file.filepath, `${ options.path }/${ options.fileName }`);
}

export function deleteFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

export function generateName(base: string): string {
    return `${ base }-${ Crypto.randomBytes(8).toString("hex") }`;
}
