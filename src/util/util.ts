import { customAlphabet } from 'nanoid';

export function makeId(length = 32) {
  const nanoid = customAlphabet('1234567890abcdef', length);
  return nanoid();
}

export function makeShortId(length = 10) {
  const nanoid = customAlphabet('1234567890abcdef', length);
  return nanoid();
}
