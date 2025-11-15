export const chartColors = {
  success: "hsl(142, 71%, 45%)",
  successDark: "hsl(142, 76%, 36%)",
  error: "hsl(0, 84%, 60%)",
  errorDark: "hsl(0, 72%, 51%)",
  warning: "hsl(38, 92%, 50%)",
  warningDark: "hsl(25, 95%, 53%)",
  primary: "hsl(217, 91%, 60%)",
  primaryDark: "hsl(221, 83%, 53%)",
  muted: "hsl(220, 13%, 91%)",
  mutedDark: "hsl(215, 28%, 17%)",
  text: "hsl(222, 47%, 11%)",
  textDark: "hsl(210, 40%, 98%)",
} as const;

export const getChartColor = (color: keyof typeof chartColors, isDark: boolean) => {
  if (color === 'success') return isDark ? chartColors.successDark : chartColors.success;
  if (color === 'error') return isDark ? chartColors.errorDark : chartColors.error;
  if (color === 'warning') return isDark ? chartColors.warningDark : chartColors.warning;
  if (color === 'primary') return isDark ? chartColors.primaryDark : chartColors.primary;
  if (color === 'muted') return isDark ? chartColors.mutedDark : chartColors.muted;
  if (color === 'text') return isDark ? chartColors.textDark : chartColors.text;
  return chartColors[color];
};
