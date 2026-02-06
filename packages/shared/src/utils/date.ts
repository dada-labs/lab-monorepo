export const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateForInput = (
  date: Date | string | undefined | null
): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatYear = (date: Date | string | undefined) => {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
};

export const formatFullDate = (date: Date | string | undefined) => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();

  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
