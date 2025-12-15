const BASE_URL = "https://arental.salesnavigators.in/api";

export const apiService = {
  // Properties
  getProperties: async (params?: string) => {
    const url = params
      ? `${BASE_URL}/properties?${params}`
      : `${BASE_URL}/properties`;
    const response = await fetch(url);
    return response.json();
  },

  // Single Property by slug
  getPropertyBySlug: async (slug: string) => {
    const response = await fetch(
      `${BASE_URL}/property-details/${slug}?image=true`
    );
    return response.json();
  },

  getFeaturedProperties: async () => {
    const response = await fetch(
      `${BASE_URL}/properties?image=true&limit=10&sortBy=price&page=1&sortOrder=DESC`
    );
    return response.json();
  },

  // Locations
  getLocations: async (limit = 8) => {
    const response = await fetch(`${BASE_URL}/locations?limit=${limit}`);
    return response.json();
  },

  // Services/Explore
  getExploreItems: async () => {
    const response = await fetch(`${BASE_URL}/explore`);
    return response.json();
  },

  // Blogs
  getBlogs: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${BASE_URL}/blogs?page=${page}&limit=${limit}&status=true`
    );
    return response.json();
  },

  // Top Properties
  getTopProperties: async () => {
    const response = await fetch(
      `${BASE_URL}/properties?image=true&limit=6&sortBy=price&page=1&sortOrder=DESC&featured=true`
    );
    return response.json();
  },

  // Contact
  submitContact: async (contactData: any) => {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    return response.json();
  },
  // Contact
  submitPropertyContact: async (contactData: any) => {
    const response = await fetch(`${BASE_URL}/properties/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    return response.json();
  },

  // FAQ
  getFAQ: async () => {
    const response = await fetch(`${BASE_URL}/faq`);
    return response.json();
  },

  // Home Content (Parallel fetch)
  getHomeContent: async () => {
    try {
      const [
        featuredProperties,
        locations,
        exploreItems,
        topProperties,
        blogs,
      ] = await Promise.all([
        apiService.getFeaturedProperties(),
        apiService.getLocations(8),
        apiService.getExploreItems(),
        apiService.getTopProperties(),
        apiService.getBlogs(1, 5),
      ]);

      return {
        featuredProperties: featuredProperties.data || [],
        locations: locations.data || [],
        exploreItems: exploreItems.data || [],
        topProperties: topProperties.data || [],
        blogs: blogs.data || [],
      };
    } catch (error) {
      console.error("Error fetching home content:", error);
      return {
        featuredProperties: [],
        locations: [],
        exploreItems: [],
        topProperties: [],
        blogs: [],
      };
    }
  },
};
