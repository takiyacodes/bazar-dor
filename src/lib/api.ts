// import { ICategory, IProduct } from "@/types/product.type";

// const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

// // prices change daily at most, so cache the responses and refresh every hour
// const fetchJson = async <T>(path: string): Promise<T> => {
//   const response = await fetch(`${BASE_URL}${path}`, {
//     next: { revalidate: 3600 },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch ${path}`);
//   }

//   return response.json();
// };

// export const getProducts = () => fetchJson<IProduct[]>("/products");

// export const getCategories = () => fetchJson<ICategory[]>("/categories");

// // returns null for an unknown slug so the page can show the 404
// export const getProduct = async (slug: string): Promise<IProduct | null> => {
//   const products = await getProducts();

//   return products.find((product) => product.slug === slug) ?? null;
// };

// export const getCategory = async (slug: string): Promise<ICategory | null> => {
//   const categories = await getCategories();

//   return categories.find((category) => category.slug === slug) ?? null;
// };

// export const getProductsByCategory = async (slug: string) => {
//   const products = await getProducts();

//   return products.filter((product) => product.category === slug);
// };

// // biggest movers in each direction for the two home page sections
// export const getTopMovers = (products: IProduct[], dir: "up" | "down") =>
//   products
//     .filter((product) => product.change.dir === dir)
//     .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
//     .slice(0, 6);



import { ICategory, IProduct } from "@/types/product.type";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

// prices change daily at most, so cache the responses and refresh every hour
const fetchJson = async <T>(path: string, fallbackData: T): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API fetch failed for ${path}, using fallback data.`, error);
    // এপিআই ফেইল করলে বা ইন্টারনেট না থাকলে অ্যাপ ক্র্যাশ না করে ফলব্যাক রিটার্ন করবে
    return fallbackData;
  }
};

export const getProducts = () => fetchJson<IProduct[]>("/products", []);

export const getCategories = () => fetchJson<ICategory[]>("/categories", []);

// returns null for an unknown slug so the page can show the 404
export const getProduct = async (slug: string): Promise<IProduct | null> => {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
};

export const getCategory = async (slug: string): Promise<ICategory | null> => {
  const categories = await getCategories();

  return categories.find((category) => category.slug === slug) ?? null;
};

export const getProductsByCategory = async (slug: string) => {
  const products = await getProducts();

  return products.filter((product) => product.category === slug);
};

// biggest movers in each direction for the two home page sections
export const getTopMovers = (products: IProduct[], dir: "up" | "down") =>
  products
    .filter((product) => product.change?.dir === dir)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);