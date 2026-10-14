// Loads every blog post in src/blog/*.md, newest first. A post's file name is its address: src/blog/x.md is /blog/x/.
// Frontmatter: title, seoTitle, description, focus (the SEO gate keyword), date (YYYY-MM-DD), topic, cover (see BlogCover.astro),
// and optionally updated and service (the slug of the page its side card points to).
const files = import.meta.glob('./blog/*.md', { eager: true });

export const topics = ['Speed', 'Fixes and maintenance', 'For agencies', 'Builds'];

export const posts = Object.entries(files)
  .map(([path, mod]) => {
    const words = mod.rawContent().split(/\s+/).filter(Boolean).length;
    return {
      slug: path.split('/').pop().replace('.md', ''),
      ...mod.frontmatter,
      Content: mod.Content,
      headings: mod.getHeadings().filter((h) => h.depth === 2),
      minutes: Math.max(1, Math.round(words / 230)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const longDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
