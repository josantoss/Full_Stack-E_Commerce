const fs = require('fs');
const path = require('path');

const outputPath = 'C:\\Users\\YOSEF\\dev\\vite-configs\\yosef-frontend.vite.config.js';

const content = `import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const requireFromProject = createRequire('file:///C:/Users/YOSEF/Pictures/Saved%20Pictures/yosef/frontend/package.json');

export default async () => {
  const pluginPath = requireFromProject.resolve('@vitejs/plugin-react');
  const { default: react } = await import(pathToFileURL(pluginPath).href);
  return {
    cacheDir: 'C:/Users/YOSEF/dev/vite-cache/yosef-frontend',
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      }
    },
    optimizeDeps: {
      force: true
    }
  };
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content, 'utf8');
console.log(`External Vite config written to: ${outputPath}`);


