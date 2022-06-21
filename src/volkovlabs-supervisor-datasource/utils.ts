/**
 * Parse JSON to Camel Case
 */
export const parseJSONToCamelCase = (obj: any): any =>
  JSON.parse(obj, function (key, value) {
    const camelCaseKey = key
      .toLowerCase()
      .replace(/^_+/g, '')
      .replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

    /**
     * Array or Camel Case
     */
    if (this instanceof Array || camelCaseKey === key) {
      return value;
    }

    this[camelCaseKey] = value;
  });
