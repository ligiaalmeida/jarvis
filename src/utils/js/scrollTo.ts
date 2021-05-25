export const scrollToRef = (ref: HTMLDivElement) => {
  window.scrollTo(0, ref.getBoundingClientRect().top);
};
