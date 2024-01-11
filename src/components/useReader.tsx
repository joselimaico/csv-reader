import { useState, ChangeEvent } from "react";

export const useReader = () => {
  const [data, setData] = useState<string[][]>([]);
  const [duplicateValues, setDuplicateValues] = useState<string[]>([]);
  const [totalPersons, setTotalPersons] = useState<number>(0);
  const [totalDuplicates, setTotalDuplicates] = useState<number>(0);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) return;
      const text = e.target.result as string;
      processData(text);
    };

    reader.readAsText(file);
  };

  const setDuplicatedRows = (rows: string[]) => {
    const duplicates: Map<string, number> = new Map();
    let totalD = 0;
    const duplicatesVals: string[] = [];
    rows.forEach((row) => {
      const finalRow = row.trim();
      if (duplicates.has(finalRow)) {
        duplicates.set(finalRow, duplicates.get(finalRow)! + 1);
      } else {
        duplicates.set(finalRow, 0);
      }
    });
    duplicates.forEach((value, key) => {
      if (value > 0) {
        totalD++;
        duplicatesVals.push(key);
      }
    });
    setTotalDuplicates(totalD);
    setDuplicateValues([...duplicatesVals]);
  };

  const eliminarDuplicados = (rows: string[]): string[][] => {
    const data = rows.map((row) => {
      const cells = row.trim().split(",");

      return cells;
    });
    const uniqueStringArrays = new Set(data.map((row) => JSON.stringify(row)));
    return Array.from(uniqueStringArrays).map((row) => JSON.parse(row));
  };

  const processData = (csv: string) => {
    const rows = csv.split("\n");
    setDuplicatedRows(rows);
    setData(eliminarDuplicados(rows));
    setTotalPersons(rows.length - 1);
  };
  const validateEmail = (email: string): boolean => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
  };
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    return phoneNumber.length === 10;
  };

  return {
    data,
    duplicateValues,
    totalPersons,
    totalDuplicates,
    handleFileUpload,
    validateEmail,
    validatePhoneNumber,
  };
};
