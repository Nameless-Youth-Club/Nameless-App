function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


  
  export function checkContrast(color) {
    const rgb = hexToRgb(color)
    const textHex = hexToRgb('#EEEEEE')

    const color1luminance = luminance(rgb.r, rgb.g, rgb.b);
    const color2luminance = luminance(textHex.r, textHex.g, textHex.b);

    const ratio = color1luminance > color2luminance 
    ? ((color2luminance + 0.05) / (color1luminance + 0.05))
    : ((color1luminance + 0.05) / (color2luminance + 0.05));

    return ratio < 1/3
                // AA-level large text: ${ratio < 1/3 ? 'PASS' : 'FAIL' }<br>
                // AA-level small text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }<br>
                // AAA-level large text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }<br>
                // AAA-level small text: ${ratio < 1/7 ? 'PASS' : 'FAIL' }

  }