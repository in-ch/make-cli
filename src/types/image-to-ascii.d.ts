declare module "image-to-ascii" {
  function convert(options: {
    path: string;
    size?: {
      width?: number;
      height?: number;
    };
    colored?: boolean;
    reverse?: boolean;
    multiply?: number;
    pixels?: string;
    alphabet?: string;
    empty_pixels?: string;
    colored_bg?: boolean;
    bg?: string;
    fg?: string;
    fit_screen?: boolean;
    size_options?: {
      screen_size?: {
        width?: number;
        height?: number;
      };
      preserve_aspect_ratio?: boolean;
    };
  }): Promise<string>;

  export = convert;
}
