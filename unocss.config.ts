import type { UserConfig } from "@unocss/core";
import presetUno from "@unocss/preset-uno";
import {presetDaisy} from 'https://esm.sh/unocss-preset-daisy'

// @ref https://github.com/unocss/unocss#configurations
export default <UserConfig> {
  presets: [presetUno(), presetDaisy({
    themes: ['winter']
  })],
};
