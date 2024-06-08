import axios from "./axiosConfig";
export const getProductById = async (id) => {
  try {
    const response = await axios.get("/products/" + id);
    const productInfo = response.data;
    console.log(productInfo);
    return productInfo;
  } catch (error) {
    throw error;
  }
};

export const getProductList = async () => {
  try {
    const response = await axios.get("/products");
    const products = response.data;
    console.log(products);
    return products;
  } catch (error) {
    throw error;
  }
};
export const getProductFilter = async (formFilter) => {
  try {
    const response = await axios.post("/products/filter", formFilter);
    const products = response.data;
    console.log(products);
    return products;
  } catch (error) {
    throw error;
  }
};
export const CreateProduct = async (
  name,
  brand,
  phoneModel,
  quantity,
  price,
  status,
  inventory,
  description,
  images,
  material,
  bought
) => {
  try {
    const body = {
      name,
      brand,
      phoneModel,
      quantity,
      price,
      status,
      inventory,
      description,
      images,
      material,
      bought,
    };
    const response = await axios.post("/products", body);
    const productData = response.data;
    console.log(productData);

    return productData;
  } catch (error) {
    throw error;
  }
};
export const UpdateProduct = async (
  producId,
  name,
  brand,
  phoneModel,
  quantity,
  price,
  status,
  inventory,
  description,
  images,
  material,
  bought
) => {
  try {
    const body = {
      name,
      brand,
      phoneModel,
      quantity,
      price,
      status,
      inventory,
      description,
      images,
      material,
      bought,
    };
    const response = await axios.put("/products/" + producId, body);
    const productData = response.data;
    console.log(productData);

    return productData;
  } catch (error) {
    throw error;
  }
};
export const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete("/products/" + id);
    const productData = response.data;
    console.log(productData);

    return productData;
  } catch (error) {
    throw error;
  }
};
export const likeProduct = async (productId, userId) => {
  try {
    const body = { userId };
    const response = await axios.put("/products/" + productId + "/like", body);
    const products = response.data;
    return products;
  } catch (error) {
    throw error;
  }
};
export const unlikeProduct = async (productId, userId) => {
  try {
    const body = { userId };
    const response = await axios.put(
      "/products/" + productId + "/unlike",
      body
    );
    const products = response.data;
    return products;
  } catch (error) {
    throw error;
  }
};
