declare module "@pagefind/default-ui" {
  class PagefindUI {
    constructor(arg: unknown);
  }
}

declare module "*.ttf" {
  const fontBytes: readonly number[];
  export default fontBytes;
}
