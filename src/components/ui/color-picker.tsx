import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

// Convert HSL to Hex
function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map((val, index) => {
    if (index === 0) return parseInt(val);
    return parseInt(val.replace('%', ''));
  });
  
  const sNorm = s / 100;
  const lNorm = l / 100;
  
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Convert Hex to HSL
function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);
  
  return `${h} ${s}% ${lPercent}%`;
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ColorPicker({ label, value, onChange, placeholder }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(() => {
    try {
      return hslToHex(value);
    } catch {
      return "#000000";
    }
  });

  useEffect(() => {
    try {
      setHexValue(hslToHex(value));
    } catch {
      setHexValue("#000000");
    }
  }, [value]);

  const handleColorChange = (hex: string) => {
    setHexValue(hex);
    try {
      const hsl = hexToHsl(hex);
      onChange(hsl);
    } catch (error) {
      console.error('Error converting hex to HSL:', error);
    }
  };

  const presetColors = [
    '#7066E0', '#5B4FC7', '#4A3FA5', // Purple variants
    '#0EA5E9', '#0284C7', '#0369A1', // Blue variants
    '#12B76A', '#039855', '#027A48', // Green variants
    '#F79009', '#DC6803', '#B54708', // Orange variants
    '#F04438', '#D92D20', '#B42318', // Red variants
    '#6B7280', '#4B5563', '#374151', // Gray variants
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <div 
                className="w-4 h-4 rounded border mr-2 flex-shrink-0"
                style={{ backgroundColor: hexValue }}
              />
              <span className="flex-1">{label}</span>
              <Palette className="h-4 w-4 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="color-input">Color Picker</Label>
                <input
                  id="color-input"
                  type="color"
                  value={hexValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 rounded border cursor-pointer"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Hex Value</Label>
                <Input
                  value={hexValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="#000000"
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Quick Colors</Label>
                <div className="grid grid-cols-6 gap-1">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-8 h-8 rounded border-2 border-border hover:border-ring transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>HSL:</span>
                  <span className="font-mono">{value}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <div 
          className="w-10 h-10 rounded border flex-shrink-0"
          style={{ backgroundColor: hexValue }}
          title={`HSL: ${value}`}
        />
      </div>
    </div>
  );
}