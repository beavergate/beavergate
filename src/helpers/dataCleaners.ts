export const removeEmptyValues = (data: any[]) => {
    return data.filter((row: any) => {
      return Object.values(row).some(value => value !== undefined && value?.toString().trim() !== "");
    });
  };
  