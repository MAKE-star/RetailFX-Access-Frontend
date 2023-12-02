import Api from "../api";

class ProductService extends Api {
  resource = "products";
  resource1 = "product";
  getProducts = (page?: number) => {
    return this.get(`${this.resource}`, { page });
  };
  getProductsCategory = () => {
    return this.get(`product-category`);
  };

  getSingleProduct = (productId: number) => {
    return this.get(`${this.resource1}/${productId}`);
  };

  createProduct = (data: any) => {
    return this.post(`${this.resource1}/create`, data);
  };

  editProduct = (data: any) => {
    return this.put(`${this.resource1}/edit/${data.productId}`, data);
  };
  deleteProduct = (productId: any) => {
    return this.delete(`${this.resource1}/edit/${productId}`);
  };
  searchProduct = (search: any) => {
    return this.get(`${this.resource1}/search?search=${search}`);
  };
}

const productService = new ProductService();
export default productService;
