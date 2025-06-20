declare module "written-number" {
  interface WrittenNumberOptions {
    lang?: string;
    [key: string]: any;
  }

  interface WrittenNumber {
    (value: number, options?: WrittenNumberOptions): string;
    defaults: WrittenNumberOptions;
  }

  const writtenNumber: WrittenNumber;
  export default writtenNumber;
}