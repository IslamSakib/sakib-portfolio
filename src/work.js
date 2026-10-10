// Loads every case study and matches it to its screenshots by file name.
const files = import.meta.glob('./work/*.md', { eager: true });
const shots = import.meta.glob('./assets/work/*.png', { eager: true });
const extras = import.meta.glob('./assets/work/extra/*.jpg', { eager: true });

export const work = Object.entries(files)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace('.md', '');
    return {
      slug,
      ...mod.frontmatter,
      Content: mod.Content,
      shot: shots[`./assets/work/${slug}.png`].default,
      extra: Object.entries(extras)
        .filter(([p]) => p.includes(`/extra/${slug}-`))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, m]) => m.default),
    };
  })
  .sort((a, b) => a.order - b.order);
