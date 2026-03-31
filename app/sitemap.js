export default function sitemap() {
  const baseUrl = 'https://homesafeeducation.com'
    const lastModified = new Date()

      return [
          { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
              { url: `${baseUrl}/packages`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
                  { url: `${baseUrl}/library`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
                      { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
                          { url: `${baseUrl}/login`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
                              { url: `${baseUrl}/register`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
                                  { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
                                      { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
                                          { url: `${baseUrl}/refunds`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
                                              { url: `${baseUrl}/cookies`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
                                                ]
                                                }
