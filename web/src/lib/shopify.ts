export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
}

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ status: number; body: T } | never> {
  // If the user hasn't provided their custom store tokens yet, we fall back to Shopify's official mock API endpoint
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Use the real domain if provided, otherwise the mock endpoint
  const isReadyToLink = domain && storefrontAccessToken;
  
  const endpoint = isReadyToLink 
    ? `https://${domain}/api/2024-01/graphql.json`
    : 'https://mock.shop/api';

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Only add the access token header if we're hitting the real store
  if (isReadyToLink) {
    headers['X-Shopify-Storefront-Access-Token'] = storefrontAccessToken;
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.error('Error fetching from Shopify:', e);
    throw {
      error: e,
      query,
    };
  }
}

export async function fetchProducts() {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: any }>({ query });
  const shopifyProducts = response.body.data.products.edges;

  return shopifyProducts.map(({ node }: any) => {
    // Map Shopify format to Evorae interface
    return {
      id: node.id.split('/').pop(),
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      // Using tags or productType for Category, fallback to Apparel
      category: node.productType || 'Apparel',
      images: node.images.edges.map((img: any) => img.node.url),
      description: node.description,
    };
  });
}

export async function fetchProductById(id: string) {
  const fullId = id.includes('gid://') ? id : `gid://shopify/Product/${id}`;
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: any }>({ query, variables: { id: fullId } });
  const node = response.body.data.product;

  if (!node) return null;

  return {
    id: node.id.split('/').pop(),
    name: node.title,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    category: node.productType || 'Apparel',
    images: node.images.edges.map((img: any) => img.node.url),
    description: node.description,
  };
}
