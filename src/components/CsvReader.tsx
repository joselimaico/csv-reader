import { useReader } from "./useReader";

export default function CsvReader() {
  const {
    handleFileUpload,
    totalPersons,
    totalDuplicates,
    data,
    duplicateValues,
    validateEmail,
    validatePhoneNumber,
  } = useReader();

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {totalPersons > 0 ? <p> Total Personas: {totalPersons}</p> : null}
      {totalDuplicates > 0 ? <p>total Duplicados: {totalDuplicates}</p> : null}
      <table>
        <tbody>
          {data
            ? data.map((row, index) => {
                const isDuplicated = duplicateValues.includes(row.join(","));
                return (
                  <tr
                    style={{
                      backgroundColor: isDuplicated ? "red" : undefined,
                    }}
                    key={index}
                  >
                    {row.map((cell, cellIndex) => {
                      if ([1, 2].includes(cellIndex) && index > 0) {
                        const validCell =
                          cellIndex === 1
                            ? validateEmail(row[1])
                            : validatePhoneNumber(row[2]);

                        return (
                          <td
                            style={{
                              backgroundColor: validCell ? undefined : "yellow",
                            }}
                            key={cellIndex}
                          >
                            {cell}
                          </td>
                        );
                      }
                      return <td key={cellIndex}>{cell}</td>;
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
}
