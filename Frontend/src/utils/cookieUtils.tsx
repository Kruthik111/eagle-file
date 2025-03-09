export function setCookie(name: String, value: String, minutesToLive: number) {
  const date = new Date();
  date.setTime(date.getTime() + minutesToLive * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;

  return [name, value];
}

export function getCookie(name: string) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;

  cArray.forEach((element) => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });
  return result;
}
