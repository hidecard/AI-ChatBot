export const showToast = (message) => {
  const event = new CustomEvent("showToast", {
    detail: { message },
  });
  window.dispatchEvent(event);
};
