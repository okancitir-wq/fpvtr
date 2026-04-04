export type BlogCategory = 'rehber' | 'haber' | 'inceleme' | 'ipucu';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  coverImage: string;
}

export interface BlogPostWithContent extends BlogPost {
  contentHtml: string;
}
