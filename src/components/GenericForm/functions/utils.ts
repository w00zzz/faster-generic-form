export const normalize = (values: Record<string, unknown>): Record<string, unknown> => {
    const keys = Object.keys(values);
    const normalized: Record<string, unknown> = {};
    keys.forEach((key: string) => {
      const value = values[key];
      normalized[key] = (typeof value === 'string' && value.length === 0) ? null : value;
    });
    return normalized;
  };