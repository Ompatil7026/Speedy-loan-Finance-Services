const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

function checkFileExists(relPath) {
    return fs.existsSync(path.join(projectRoot, relPath));
}

function getFileContent(relPath) {
    try {
        return fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
    } catch (e) {
        return '';
    }
}

console.log("=========================================");
console.log("🔍 SPEEDY LOAN FINANCE - SEO AUDIT TOOL");
console.log("=========================================\n");

let score = 0;
const report = [];

// 1. Robots.txt or Robots.ts
const hasRobotsFile = checkFileExists('public/robots.txt') || checkFileExists('src/app/robots.ts') || checkFileExists('src/app/robots.tsx');
if (hasRobotsFile) {
    score += 10;
    report.push({ name: 'Robots.txt / robots.ts config', status: '✅ PASS', score: 10, max: 10, details: 'Search engine crawler instructions found.' });
} else {
    report.push({ name: 'Robots.txt / robots.ts config', status: '❌ FAIL', score: 0, max: 10, details: 'No robots.txt or dynamic robots.ts found. Search bots may not index the site properly.' });
}

// 2. Sitemap.xml or Sitemap.ts
const hasSitemapFile = checkFileExists('public/sitemap.xml') || checkFileExists('src/app/sitemap.ts') || checkFileExists('src/app/sitemap.tsx');
if (hasSitemapFile) {
    score += 15;
    report.push({ name: 'Sitemap.xml / sitemap.ts config', status: '✅ PASS', score: 15, max: 15, details: 'Dynamic sitemap or static sitemap found.' });
} else {
    report.push({ name: 'Sitemap.xml / sitemap.ts config', status: '❌ FAIL', score: 0, max: 15, details: 'No sitemap.xml or sitemap.ts found. Search crawlers will have difficulty discovering all pages.' });
}

// 3. Schema JSON-LD Structured Data
const hasSchemaMarkup = getFileContent('src/app/layout.tsx').includes('application/ld+json') ||
                        getFileContent('src/app/page.tsx').includes('application/ld+json') ||
                        getFileContent('src/app/(site)/blog/[slug]/page.tsx').includes('application/ld+json');
if (hasSchemaMarkup) {
    score += 10;
    report.push({ name: 'Schema JSON-LD Structured Data', status: '✅ PASS', score: 10, max: 10, details: 'Found structured JSON-LD schema.' });
} else {
    report.push({ name: 'Schema JSON-LD Structured Data', status: '❌ FAIL', score: 0, max: 10, details: 'No structured data markup (JSON-LD) found. Missed opportunity for Rich Snippets / Google Knowledge Graph.' });
}

// 4. Metadata API configuration on key pages
const pages = [
    { name: 'Home page', path: 'src/app/page.tsx' },
    { name: 'Blog list page', path: 'src/app/(site)/blog/page.tsx' },
    { name: 'Blog post page', path: 'src/app/(site)/blog/[slug]/page.tsx' },
    { name: 'Contact page', path: 'src/app/(site)/contact/page.tsx' },
    { name: 'Speakers page', path: 'src/app/(site)/speakers/page.tsx' },
    { name: 'Schedules page', path: 'src/app/(site)/schedules/page.tsx' },
    { name: 'Documentation page', path: 'src/app/(site)/documentation/page.tsx' }
];

let totalTitleCount = 0;
let totalDescriptionCount = 0;
let totalKeywordsCount = 0;
let totalOgCount = 0;
let totalTwitterCount = 0;
let totalCanonicalCount = 0;
let totalRobotsCount = 0;

pages.forEach(p => {
    const content = getFileContent(p.path);
    if (!content) return;

    if (content.includes('title:')) {
        totalTitleCount++;
    }
    if (content.includes('description:')) {
        totalDescriptionCount++;
    }
    if (content.includes('keywords:')) {
        totalKeywordsCount++;
    }
    if (content.includes('openGraph:') || content.includes('og:')) {
        totalOgCount++;
    }
    if (content.includes('twitter:') || content.includes('twitterCard:')) {
        totalTwitterCount++;
    }
    if (content.includes('canonical') || content.includes('alternates:')) {
        totalCanonicalCount++;
    }
    if (content.includes('robots:')) {
        totalRobotsCount++;
    }
});

// Title Tags Score (Max 10)
const titleScore = Math.round((totalTitleCount / pages.length) * 10);
score += titleScore;
report.push({ 
    name: 'Title Tags', 
    status: titleScore === 10 ? '✅ PASS' : (titleScore > 5 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: titleScore, 
    max: 10, 
    details: `Meta title tags set on ${totalTitleCount}/${pages.length} main pages.` 
});

// Meta Description Score (Max 15)
const descScore = Math.round((totalDescriptionCount / pages.length) * 15);
score += descScore;
report.push({ 
    name: 'Meta Descriptions', 
    status: descScore === 15 ? '✅ PASS' : (descScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: descScore, 
    max: 15, 
    details: `Meta descriptions set on ${totalDescriptionCount}/${pages.length} main pages.` 
});

// Keywords Score (Max 5)
const keyScore = Math.round((totalKeywordsCount / pages.length) * 5);
score += keyScore;
report.push({ 
    name: 'Meta Keywords', 
    status: keyScore === 5 ? '✅ PASS' : (keyScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: keyScore, 
    max: 5, 
    details: `Meta keywords configured on ${totalKeywordsCount}/${pages.length} pages.` 
});

// OpenGraph Score (Max 10)
const ogScore = Math.round((totalOgCount / pages.length) * 10);
score += ogScore;
report.push({ 
    name: 'OpenGraph Tags (Social Share)', 
    status: ogScore === 10 ? '✅ PASS' : (ogScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: ogScore, 
    max: 10, 
    details: `OpenGraph (Facebook/LinkedIn) optimized on ${totalOgCount}/${pages.length} pages.` 
});

// Twitter Score (Max 5)
const twScore = Math.round((totalTwitterCount / pages.length) * 5);
score += twScore;
report.push({ 
    name: 'Twitter Card Tags', 
    status: twScore === 5 ? '✅ PASS' : (twScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: twScore, 
    max: 5, 
    details: `Twitter card configuration optimized on ${totalTwitterCount}/${pages.length} pages.` 
});

// Canonical URL Score (Max 10)
const canScore = Math.round((totalCanonicalCount / pages.length) * 10);
score += canScore;
report.push({ 
    name: 'Canonical & Alternate URLs', 
    status: canScore === 10 ? '✅ PASS' : (canScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: canScore, 
    max: 10, 
    details: `Canonical URLs defined on ${totalCanonicalCount}/${pages.length} pages.` 
});

// Robots Metadata Score (Max 10)
const robotsScore = Math.round((totalRobotsCount / pages.length) * 10);
score += robotsScore;
report.push({ 
    name: 'Robots Meta Config', 
    status: robotsScore === 10 ? '✅ PASS' : (robotsScore > 0 ? '⚠️ WARNING' : '❌ FAIL'), 
    score: robotsScore, 
    max: 10, 
    details: `Index/Follow robot metadata rules set on ${totalRobotsCount}/${pages.length} pages.` 
});

console.log("-----------------------------------------");
console.log(`📊 OVERALL SEO SCORE: ${score} / 100`);
console.log("-----------------------------------------\n");

console.table(report.map(r => ({
    'SEO Parameter': r.name,
    'Status': r.status,
    'Score': `${r.score}/${r.max}`,
    'Description': r.details
})));
