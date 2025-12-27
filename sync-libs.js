const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CACHE_DIR = path.join(process.cwd(), 'aiolds.cache');
const LIBS_DIR = path.join(process.cwd(), 'libs');
const TSCONFIG_PATH = path.join(process.cwd(), 'tsconfig.base.json');

if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
if (!fs.existsSync(LIBS_DIR)) fs.mkdirSync(LIBS_DIR, { recursive: true });

function sync() {
    // Четем файла и махаме коментарите, за да не гърми JSON.parse
    let content = fs.readFileSync(TSCONFIG_PATH, 'utf8');
    content = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

    const tsconfig = JSON.parse(content);
    const paths = tsconfig.compilerOptions.paths || {};

    Object.keys(paths).forEach(libName => {
        if (libName.startsWith('xl-')) {
            const cachePath = path.join(CACHE_DIR, libName);
            const publicPath = path.join(LIBS_DIR, libName);

            // 1. Клониране ако липсва в кеша
            if (!fs.existsSync(cachePath)) {
                console.log(`🚀 Cloning ${libName}...`);
                // Тук генерираме линка автоматично
                const repoUrl = `git@github.com:taurus366/${libName}.git`;
                try {
                    execSync(`git clone ${repoUrl} ${cachePath}`, { stdio: 'inherit' });
                } catch (e) {
                    console.error(`❌ Failed to clone ${libName}`);
                    return;
                }
            }

            // 2. Symlink към libs/
            if (!fs.existsSync(publicPath)) {
                console.log(`🔗 Linking ${libName} -> libs/`);
                try {
                    // На Windows 'junction', на Linux 'dir'
                    const type = process.platform === "win32" ? "junction" : "dir";
                    fs.symlinkSync(cachePath, publicPath, type);
                } catch (e) {
                    console.error(`❌ Link error for ${libName}: ${e.message}`);
                }
            }
        }
    });
}

const mode = process.argv[2];
if (mode === 'upgrade') {
    console.log('🔄 Upgrading libraries...');
    const dirs = fs.readdirSync(CACHE_DIR);
    dirs.forEach(dir => {
        const fullPath = path.join(CACHE_DIR, dir);
        if (fs.statSync(fullPath).isDirectory()) {
            console.log(`Updating ${dir}...`);
            execSync(`git -C ${fullPath} pull`, { stdio: 'inherit' });
        }
    });
} else {
    sync();
}
