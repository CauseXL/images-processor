export const debouncePromise = (time: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
};
