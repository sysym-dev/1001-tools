export function optionalElement(cond: any, value: any): any[] {
  return !!cond ? [value] : [];
}
