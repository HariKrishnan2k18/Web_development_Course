export const cleanFileName = str => str.replace(/^[^a-zA-Z]+|\.mp4$/g, "");

export const sortName = arr => {
  function getLeadingNumbers(fileName) {
    const match = fileName.match(/^\d+/);
    return match ? match[0] : "";
  }
  return arr.sort(
    (a, b) => getLeadingNumbers(a.name) - getLeadingNumbers(b.name)
  );
};
