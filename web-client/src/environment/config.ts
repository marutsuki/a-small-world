export function serverUrl(path: string = ""): string {
  return (import.meta.env.SERVER_URL || "http://localhost:8080/").concat(path);
}
