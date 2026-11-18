export function engineDisplacementLitres(value: string | undefined) {
  const match = value?.trim().match(/^(\d+(?:\.\d+)?)\s*[LT](?=\s*·|$)/i);
  return match ? Number(match[1]) : undefined;
}

export function trimEngineDisplacementLitres(name: string | undefined) {
  const match = name?.match(/(?:^|\s)(\d+(?:\.\d+)?)\s*[LT](?=\s|$)/i);
  return match ? Number(match[1]) : undefined;
}
