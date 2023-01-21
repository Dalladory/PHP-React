import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import {
  IProductItem,
  ISearchProduct,
  ProductActionTypes,
} from "./store/types";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import qs from "qs";

const HomePage = () => {
  console.log("render");

  const { list, current_page, count_pages, total } = useTypedSelector(
    (store) => store.product
  );
  const { GetProducts, DeleteProduct } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<ISearchProduct>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
    rowsPerPage: searchParams.get("rowsPerPage") || 2,
  });

  useEffect(() => {
    console.log("useuffect");

    GetProducts("/api/products?" + qs.stringify(filterNonNull(search)));
  }, [search]);

  function filterNonNull(obj: ISearchProduct): any {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  const deleteHandler = (event: any) => {
    const id = event.target.id;
    DeleteProduct(id);
  };

  const handleSearchProduct = (event: any) => {
    event.preventDefault();
    const name = event.target.value;
    const finder: ISearchProduct = { ...search, name, page: 1 };
    setSearchParams(filterNonNull(finder));
    setSearch(finder);
  };

  const data = list?.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          id={product.id.toString()}
          onClick={deleteHandler}
        >
          Delete product
        </button>
      </td>
    </tr>
  ));

  let buttons = [];

  for (let i = 1; i <= count_pages; i++) {
    buttons.push(i);
  }

  const handleChangePage = (page: number | string) => {
    setSearch({ ...search, page });
  };

  const handleChangeRowsPerPage = (event: any) => {
    const rowsPerPage = event.target.value;
    const finder: ISearchProduct = { ...search, rowsPerPage, page: 1 };
    setSearchParams(filterNonNull(finder));
    setSearch(finder);
  };

  const paginations = buttons.map((page) => (
    <li
      key={page}
      className={classNames("page-item", { active: current_page == page })}
    >
      <Link
        className="page-link"
        to={"?" + qs.stringify(filterNonNull({ ...search, page }))}
        onClick={() => {
          handleChangePage(page);
        }}
      >
        {page}
      </Link>
    </li>
  ));

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <Link to="/addproduct">
        <button type="button" className="btn btn-primary">
          Add product
        </button>
      </Link>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        defaultValue={search.name}
        onChange={handleSearchProduct}
      ></input>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Назва</th>
            <th scope="col">Опис</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li
            className={classNames("page-item", { disabled: current_page == 1 })}
          >
            <Link
              className="page-link"
              to={
                "?" +
                qs.stringify(
                  filterNonNull({ ...search, page: current_page - 1 })
                )
              }
              onClick={() => {
                handleChangePage(current_page - 1);
              }}
            >
              Previous
            </Link>
          </li>
          {paginations}
          <li
            className={classNames("page-item", {
              disabled: current_page == count_pages,
            })}
          >
            <Link
              className="page-link"
              to={
                "?" +
                qs.stringify(
                  filterNonNull({ ...search, page: current_page + 1 })
                )
              }
              onClick={() => {
                handleChangePage(current_page + 1);
              }}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
      <div id="rows">
        <label>
          Show{" "}
          <select
            name="DataTables_Table_0_length"
            aria-controls="DataTables_Table_0"
            className="form-control input-sm"
            defaultValue={search.rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          Rows
        </label>
      </div>
    </>
  );
};

export default HomePage;
