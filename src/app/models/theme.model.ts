export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--background-default': 'hsl(0, 0%, 100%)',
    '--text-default': 'hsl(200, 15%, 8%)',
    '--element-default': 'hsl(0, 0%, 100%)',
    '--input-default': 'hsl(0, 0%, 52%)'
  }
  };

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--background-default': 'hsl(207, 26%, 17%)',
    '--text-default': 'hsl(0, 0%, 100%)',
    '--element-default': 'hsl(209, 23%, 22%)',
    '--input-default': 'hsl(0, 0%, 100%)'
  }
};
