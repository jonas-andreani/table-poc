export function parseCSVToObject(csvText: string): any[] {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};

    headers.forEach((header, index) => {
      // Remove any leading/trailing whitespaces
      const key = header.trim();
      const value = values[index].trim();

      // Convert numeric values to numbers
      obj[key] = isNaN(Number(value)) ? value : Number(value);
    });

    return obj;
  });
}
