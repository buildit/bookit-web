import { loadJavascript, lintJavascript, minifyJavascript, uglifyJavascript, extractJavascript, generateSourceMaps } from './javascript'
import { loadStyles, lintStyles, extractStyles } from './style'
import { loadHtml, loadAssets } from './asset'

import { devServer, hotloader } from './devserver'

import { cleanPlugin, noErrorsPlugin, namedModulesPlugin, hashedModuleIdsPlugin } from './plugins'
import { page } from './page'
import { stats } from './stats'

export default {
  loadJavascript, lintJavascript, minifyJavascript, uglifyJavascript, extractJavascript, generateSourceMaps,
  loadStyles, lintStyles, extractStyles,
  loadHtml, loadAssets,
  devServer, hotloader,
  cleanPlugin, noErrorsPlugin, namedModulesPlugin, hashedModuleIdsPlugin,
  page,
  stats,
}
