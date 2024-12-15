type ValueType = string | number | undefined;

export const isMatch = (value: ValueType, targetValue: ValueType) => value === targetValue;