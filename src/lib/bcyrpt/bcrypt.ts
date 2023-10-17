import * as bcrypt from 'bcrypt';

export async function compareHashes(
  hash1: string,
  hash2: string,
): Promise<boolean> {
  return await bcrypt.compare(hash1, hash2);
}

export async function hashPass(pass: string): Promise<string> {
  return await bcrypt.hash(pass, 10);
}
