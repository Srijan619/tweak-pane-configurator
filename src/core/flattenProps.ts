import { fourSidedProps } from "./tweakPaneConfigurator";

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

let firstPrefix = "";

export function flattenPropsFirstAndLastKey(
  obj: any,
  prefix: string = "",
): FlattenedProps {
  let result: FlattenedProps = {};

  if (!firstPrefix) firstPrefix = Object.keys(obj)[0];
  Object.entries(obj).forEach(([key, value]) => {
    const newPrefix = prefix ? `${prefix}` : key;

    if (!firstPrefix) firstPrefix = key;
    if (typeof value === "string" && firstPrefix === newPrefix) {
      // No op for string that does not have any nested object
      result[key] = value;
      firstPrefix = "";
      return;
    }

    if (fourSidedProps.includes(key)) {
      // Exceptionally for four sided props, we should take the second last keys too..
      const fourSidedPrefix = `${newPrefix}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      Object.assign(
        result,
        flattenPropsFirstAndLastKey(value, fourSidedPrefix),
      );
    }
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Recursively flatten, passing the first key as the prefix for the next level
      Object.assign(result, flattenPropsFirstAndLastKey(value, newPrefix));
    } else {
      // Add the flattened key-value pair with first and last keys
      result[`${newPrefix}${key.charAt(0).toUpperCase() + key.slice(1)}`] =
        value;
    }
  });

  return result;
}
