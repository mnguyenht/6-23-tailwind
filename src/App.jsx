import { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

function ProductRow({ product }) {
  return (
    <div
      class="p-4 gap-4 flex flex-row justify-center"
      // style={{
      //   padding: "16px",
      //   gap: "16px",
      //   display: "flex",
      //   flexDirection: "row",
      //   justifyContent: "center",
      // }}
    >
      <div>{product.name}</div>
      <div>{product.price}</div>
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductTable({ inStockOnly, products, searchText, setSearchText }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (inStockOnly && !product.stocked) {
      return;
    } else if (
      product.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1
    ) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />);
    }
    rows.push(<ProductRow product={product} />);
    lastCategory = product.category;
  });
  console.log("product");

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ inStockOnly, setInStockOnly, searchText, setSearchText }) {
  console.log("🔄 SearchBar rendered");
  return (
    <form
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "flex-start",
      //   margin: "16px",
      // }}
      class="flex flex-col align-middle m-4 relative"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchText(e.target.value);
          console.log(searchText);
        }}
      ></input>
      <label>
        <input
          type="checkbox"
          onClick={(e) => {
            setInStockOnly(e.target.checked);
            console.log("adadad");
          }}
        ></input>
        Only Show Products in Stock
      </label>
    </form>
  );
}
function SearchBar2({
  inStockOnly,
  setInStockOnly,
  searchText,
  setSearchText,
}) {
  console.log("🔄 SearchBar2 rendered");

  return (
    <form
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "flex-start",
      //   margin: "16px",
      // }}
      class="flex flex-col align-middle m-4 relative"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchText(e.target.value);
          console.log("search2");
        }}
      ></input>
      <label>
        <input
          type="checkbox"
          onClick={(e) => {
            setInStockOnly(e.target.checked);
            console.log("check2");
          }}
        ></input>
        Only Show Products in Stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFlag, setIsFlag] = useState(false);

  return (
    <div
      // style={{ border: "1px solid" }}
      class="border-2 m-16"
    >
      <SearchBar
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <SearchBar2
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ProductTable
        products={products}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Calendar
        mode="single"
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  // const [date, setDate] = (React.useState < Date) | (undefined > new Date());

  return (
    <>
      <div class="m-auto">
        <FilterableProductTable products={PRODUCTS} />
      </div>
    </>
  );
}
