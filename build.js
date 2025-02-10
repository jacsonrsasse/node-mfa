/* eslint-disable @typescript-eslint/no-require-imports */
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ["src/index.ts"], // Ponto de entrada da sua API
  outdir: "dist", // Diretório de saída
  bundle: true, // Gera um único arquivo
  platform: "node", // Indica que é uma aplicação Node.js
  target: "node18", // Versão do Node.js desejada
  sourcemap: true, // Habilita source maps
  tsconfig: "tsconfig.json", // Respeita o tsconfig
  minify: false, // Desative a minificação para debug (altere para `true` em produção)
  packages: "external"
}).catch(() => process.exit(1));