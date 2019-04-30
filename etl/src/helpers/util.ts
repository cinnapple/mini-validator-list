const uniq = (arry: any[] = []) => {
  return Array.from(new Set<string>(arry.map(x => x).filter(x => x)).values());
};

export { uniq };
