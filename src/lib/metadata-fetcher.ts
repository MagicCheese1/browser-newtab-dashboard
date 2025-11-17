export interface PageMetadata {
  title: string;
  favicon: string;
}

export async function fetchPageMetadata(url: string): Promise<PageMetadata> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
  const urlObj = new URL(normalizedUrl);
  const hostname = urlObj.hostname;

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;

  const domain = hostname.replace('www.', '');
  const domainParts = domain.split('.');
  const siteName = domainParts[0];
  const title = siteName.charAt(0).toUpperCase() + siteName.slice(1);

  let pageTitle = title;
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(normalizedUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.contents) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const metaTitle = doc.querySelector('title')?.textContent;
      
      if (metaTitle && metaTitle.trim()) {
        pageTitle = metaTitle.trim();
      } else {
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
        if (ogTitle) {
          pageTitle = ogTitle;
        }
      }

      const linkIcon = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
      if (linkIcon) {
        const href = linkIcon.getAttribute('href');
        if (href) {
          const absoluteFavicon = new URL(href, normalizedUrl).toString();
          return {
            title: pageTitle,
            favicon: absoluteFavicon,
          };
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch page metadata, using fallback:', error);
  }

  return {
    title: pageTitle,
    favicon: faviconUrl,
  };
}

