type FlattenedProps = { [key: string]: any };

export function flattenProps(obj: any, prefix: string = ""): FlattenedProps {
  let result: FlattenedProps = {};

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix
      ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`
      : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Recursively flatten if the value is an object
      Object.assign(result, flattenProps(value, newKey));
    } else {
      // Add the flat key-value pair
      result[newKey] = value;
    }
  });

  return result;
}
