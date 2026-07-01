import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsSourceDir = path.resolve(__dirname, '../../docs/docs/column');
const articlesDestDir = path.resolve(__dirname, '../src/docs/articles');
const publicAssetsDir = path.resolve(__dirname, '../public/docs-assets');
const outputPostsJson = path.resolve(__dirname, '../src/data/posts.json');
const outputDocsTs = path.resolve(__dirname, '../src/data/synced-docs.ts');

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Only sync technical and relevant categories
const allowedCategories = ['AI', 'Algorithm', 'NodeJS', 'ThreeJS', 'Vue', 'deepseek', 'harmony-os-4.0-series', 'web', 'Games'];

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDirSync(dest);
    fs.readdirSync(src).forEach(child => {
      copyDirSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function parseMarkdown(filePath, category) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const rawFileName = path.basename(filePath, '.md');
  const safeId = rawFileName.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').toLowerCase();
  
  let title = rawFileName;
  let excerpt = '';
  
  let inCodeBlock = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }
    if (trimmed.startsWith('# ') && title === rawFileName) {
      title = trimmed.replace('# ', '');
    } else if (!inCodeBlock && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!') && !trimmed.startsWith('>') && !trimmed.startsWith('-') && !trimmed.startsWith('`') && !trimmed.startsWith('<')) {
      if (!excerpt) {
        excerpt = trimmed.substring(0, 100) + (trimmed.length > 100 ? '...' : '');
      }
    }
  }

  // Auto-close unclosed code blocks to prevent Markdown rendering issues
  if (inCodeBlock) {
    content += '\n```\n';
  }

  const stat = fs.statSync(filePath);
  const destMdPath = path.join(articlesDestDir, `${safeId}.md`);
  
  let fixedContent = content.replace(/!\[(.*?)\]\(<(.*?)>\)/g, (match, alt, imgPath) => {
    if (imgPath.startsWith('http') || imgPath.startsWith('data:') || imgPath.startsWith('/')) return match;
    const absolutePath = path.posix.resolve('/', 'docs-assets', category, imgPath.replace(/\\/g, '/'));
    return `![${alt}](<${absolutePath}>)`;
  });

  fixedContent = fixedContent.replace(/!\[(.*?)\]\(([^<].*?)\)/g, (match, alt, imgPath) => {
    if (imgPath.startsWith('http') || imgPath.startsWith('data:') || imgPath.startsWith('/')) return match;
    const absolutePath = path.posix.resolve('/', 'docs-assets', category, imgPath.replace(/\\/g, '/'));
    return `![${alt}](<${absolutePath}>)`;
  });
  
  // Replace HTML src="..." attributes (for img, video, source, etc.)
  fixedContent = fixedContent.replace(/src="([^"]+)"/g, (match, srcPath) => {
    if (srcPath.startsWith('http') || srcPath.startsWith('data:') || srcPath.startsWith('/')) return match;
    const absolutePath = path.posix.resolve('/', 'docs-assets', category, srcPath.replace(/\\/g, '/'));
    return `src="${absolutePath}"`;
  });

  fixedContent = fixedContent.replace(/src='([^']+)'/g, (match, srcPath) => {
    if (srcPath.startsWith('http') || srcPath.startsWith('data:') || srcPath.startsWith('/')) return match;
    const absolutePath = path.posix.resolve('/', 'docs-assets', category, srcPath.replace(/\\/g, '/'));
    return `src='${absolutePath}'`;
  });
  
  fs.writeFileSync(destMdPath, fixedContent, 'utf-8');

  return {
    id: safeId,
    title,
    category,
    date: formatDate(stat.mtime),
    readTime: Math.ceil(content.length / 500) + ' 分钟',
    excerpt: excerpt || '点击查看详情...',
    coverUrl: '',
    safeId
  };
}

function syncDocs() {
  if (!fs.existsSync(docsSourceDir)) {
    console.error('Docs directory not found:', docsSourceDir);
    process.exit(1);
  }

  if (fs.existsSync(articlesDestDir)) fs.rmSync(articlesDestDir, { recursive: true, force: true });
  if (fs.existsSync(publicAssetsDir)) fs.rmSync(publicAssetsDir, { recursive: true, force: true });
  ensureDirSync(articlesDestDir);
  ensureDirSync(publicAssetsDir);

  // Copy entire docsSourceDir to publicAssetsDir
  copyDirSync(docsSourceDir, publicAssetsDir);

  const posts = [];
  const allCategories = fs.readdirSync(docsSourceDir).filter(f => fs.statSync(path.join(docsSourceDir, f)).isDirectory());
  const categories = allCategories.filter(cat => allowedCategories.includes(cat));
  const docMenus = [];

  categories.forEach(category => {
    const catDir = path.join(docsSourceDir, category);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    
    const items = [];
    files.forEach(file => {
      const post = parseMarkdown(path.join(catDir, file), category);
      posts.push(post);
      items.push({
        id: post.safeId,
        title: post.title,
        description: post.excerpt,
        importPath: `@/docs/articles/${post.safeId}.md`
      });
    });
    
    if (items.length > 0) {
      docMenus.push({
        title: category,
        items
      });
    }
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.writeFileSync(outputPostsJson, JSON.stringify(posts, null, 2), 'utf-8');
  
  let tsContent = `import { defineAsyncComponent, h } from 'vue';

const LoadingComponent = {
  render() {
    return h('div', { class: 'py-32 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 w-full' }, [
      h('svg', { class: 'w-8 h-8 animate-spin text-indigo-500 mb-4', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' }, [
        h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
        h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' })
      ]),
      h('span', { class: 'text-sm font-medium tracking-wider animate-pulse' }, '正在加载核心文档...')
    ]);
  }
};

const createDoc = (loader: any) => defineAsyncComponent({
  loader,
  loadingComponent: LoadingComponent,
  delay: 50,
});

export const syncedDocMenus = [\n`;

  docMenus.forEach(cat => {
    tsContent += `  {\n    title: '${cat.title}',\n    items: [\n`;
    cat.items.forEach(item => {
      tsContent += `      { id: '${item.id}', title: \`${item.title.replace(/`/g, '\\`')}\`, description: \`${item.description.replace(/`/g, '\\`')}\`, component: createDoc(() => import('${item.importPath}')) },\n`;
    });
    tsContent += `    ]\n  },\n`;
  });
  tsContent += `];\n`;
  
  fs.writeFileSync(outputDocsTs, tsContent, 'utf-8');
  console.log(`Successfully synced ${posts.length} articles with image and HTML src path rewriting.`);
}

syncDocs();
