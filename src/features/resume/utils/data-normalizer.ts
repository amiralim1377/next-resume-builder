export function normalizeFormData<T>(data: T): T | null {
  // ۱. داده‌های خالی یا تعریف‌نشده
  if (data === undefined || data === null) {
    return null;
  }

  if (Array.isArray(data)) {
    return JSON.parse(JSON.stringify(data));
  }

  if (typeof data === "object") {
    const cleanObject = JSON.parse(JSON.stringify(data));

    if (Object.keys(cleanObject).length === 0) {
      return null;
    }

    return cleanObject;
  }

  return data;
}
