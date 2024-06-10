declare namespace jest {
  interface Matchers<R, T> {
    toBeInTheDocument(): R;
  }
}
