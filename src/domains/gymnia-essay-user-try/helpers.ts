export function safeJsonParse(str) {
  if (str && typeof str === 'string') {
    try {
      return JSON.parse(str.replace(/```[a-z]*|```/gi, '').trim());
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  if (str && typeof str === 'object') {
    return str;
  }
}
