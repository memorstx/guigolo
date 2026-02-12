import { es } from "./es";
import { en } from "./en";

export function getDict(locale: string) {
  return locale === "en" ? en : es;
}
