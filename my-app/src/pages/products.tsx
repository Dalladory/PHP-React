import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://laravel.php.com/api/products",
      responseType: "stream",
    }).then(function (response) {
      setProducts(JSON.parse(response.data));
    });
  }, []);

  return (
    <>
      {products?.map(({ name, detail }) => {
        return (
          <>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Name: {name}</strong>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Details: {detail}</strong>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Products;
