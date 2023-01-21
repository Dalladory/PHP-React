import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import http from "../../http_common";
import { IProductItem, ProductActionTypes } from "../home/store/types";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";

const AddProduct = () => {
  const navigate = useNavigate();
  const { AddProduct } = useActions();
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  const saveHandler = (event: any) => {
    event.preventDefault();
    const product: IProductItem = { id: 0, name, detail };
    AddProduct(product);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={saveHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            Details
          </label>
          <textarea
            className="form-control"
            id="detail"
            name="detail"
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
