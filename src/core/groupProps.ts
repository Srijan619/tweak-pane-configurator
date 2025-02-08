// TODO: This is not perfect yet
export const groupProperties = (props: Record<string, any>) => {
  const grouped: Record<string, Record<string, any> | string> = {};
  const keys = Object.keys(props);

  // Function to get the logical prefix before the first uppercase character after the lowercase portion
  const findLogicalPrefix = (key: string) => {
    const match = key.match(/^([a-z]+)([A-Z][a-zA-Z]*)$/);
    if (match) {
      return match[1]; // Extract the prefix portion (before the first uppercase letter)
    }
    return key; // If no match, keep the full key
  };

  keys.forEach((key) => {
    const prefix = findLogicalPrefix(key);
    const propName = key.slice(prefix.length); // Extract the remainder of key

    if (prefix !== key) {
      // If the prefix exists and is not an object yet, convert it to an object
      if (!(grouped[prefix] instanceof Object)) {
        grouped[prefix] = {};
      }

      (grouped[prefix] as Record<string, any>)[propName] = props[key]; // Ensure object structure
    } else {
      grouped[key] = props[key]; // Keep ungrouped properties as they are
    }
  });

  console.log(grouped);
  return grouped;
};
