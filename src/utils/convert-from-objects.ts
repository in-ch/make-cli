export interface Row {
  [key: string]: string;
}

interface ConvertedData {
  column: string[];
  rows: string[][];
}

/**
 * @param {Row[]} data
 * @description Convert data from objects to arrays
 * @returns {ConvertedData}
 */
export default function convertFromObjects(data: Row[]): ConvertedData {
  if (data.length === 0) return { column: [], rows: [] };
  const column = Object.keys(data[0]);
  const rows = data.map((row) => column.map((key) => row[key] || ""));
  return { column, rows };
}
