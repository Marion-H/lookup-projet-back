const Product = require("./model/product.model");
const ProductInfo = require("./model/product_info.model");

Product.hasMany(ProductInfo, {
  foreignKey: { allowNull: false },
  as: "ProductsInfo",
});
ProductInfo.belongsTo(Product, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
