const colorLuminance = (hex, lum) => {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
};

// get from: http://paletton.com/#uid=33c0u0krVDHgEOrmuIlAyvwAxni
const basePalette = {
  blue: "#2765C0",
  green: "#18BC9C",
  red: "#F61F3D",
  orange: "#FF7821",
  yellow: "#FFAD21",
  grey: "#909590"
};

const lum = {
  lightest: 0,
  dark: -0.8,
  darker: -0.9
};

const basePaletteDark = {
  blue: colorLuminance(basePalette.blue, lum.dark),
  green: colorLuminance(basePalette.green, lum.dark),
  red: colorLuminance(basePalette.red, lum.dark),
  orange: colorLuminance(basePalette.orange, lum.dark)
};

const basePaletteDarker = {
  blue: colorLuminance(basePalette.blue, lum.darker),
  green: colorLuminance(basePalette.green, lum.darker),
  red: colorLuminance(basePalette.red, lum.darker),
  orange: colorLuminance(basePalette.orange, lum.darker)
};

const _gradients = (
  baseColor,
  data: { rate: number }[],
  adjustFactor: number = 1,
  startWithLight: boolean = true
) => {
  return data.map(d =>
    colorLuminance(
      basePalette[baseColor],
      (startWithLight ? -1 : 1) * adjustFactor * d.rate
    )
  );
};

const createDarkColor = baseColor => {
  return basePaletteDark[baseColor];
};

const createDarkerColor = baseColor => {
  return basePaletteDarker[baseColor];
};

const createGradientColor = (baseColor, range) => {
  const grad = [];
  const max = lum.dark;
  const step = max / (range - 1);
  for (var i = lum.lightest; i >= max; i += step) {
    grad.push(colorLuminance(basePalette[baseColor], i));
  }
  return grad;
};

const _palette = {
  blue: basePalette.blue,
  green: basePalette.green,
  red: basePalette.red,
  orange: basePalette.orange,
  grey: basePalette.grey,
  dark: createDarkColor,
  darker: createDarkerColor,
  gradient2: color => createGradientColor(color, 2)
};

const _color = (color, lum) => {
  return colorLuminance(basePalette[color], lum);
};

export { _palette, _color, _gradients };
