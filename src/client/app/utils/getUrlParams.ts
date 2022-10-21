export default function getUrlParams(str = "") {
  const queryString = str || typeof window !== "undefined" && window.location.search;

  return new URLSearchParams(queryString as string);
}
