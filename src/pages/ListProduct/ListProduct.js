import React, { useEffect } from "react";
import ButtonCart from "../../components/Shared/Button";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { getProductList, getProductFilter } from "../../service/ProductService";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "brand",
    name: "Type",
    options: [
      { value: "Apple", label: "Apple", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
    ],
  },
  {
    id: "phoneModel",
    name: "Phone Model",
    options: [
      { value: "iPhone 14", label: "iPhone 14", checked: false },
      { value: "iPhone 13", label: "iPhone 13", checked: false },
      { value: "Galaxy S21", label: "Galaxy S21", checked: false },
    ],
  },
  {
    id: "material",
    name: "Material",
    options: [
      { value: "Plastic", label: "Plastic", checked: false },
      { value: "Silicone", label: "Silicone", checked: false },
      { value: "Glass", label: "Glass", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productList = await getProductList();
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleFilterChange = async (id, value, checked) => {
    const newSelectedFilters = { ...selectedFilters };
    if (!newSelectedFilters[id]) {
      newSelectedFilters[id] = [];
    }
    if (checked) {
      newSelectedFilters[id].push(value);
    } else {
      newSelectedFilters[id] = newSelectedFilters[id].filter(
        (val) => val !== value
      );
    }
    const formattedFilters = {};
    for (const key in newSelectedFilters) {
      if (newSelectedFilters[key].length > 0) {
        formattedFilters[key] = newSelectedFilters[key];
      }
    }
    setSelectedFilters(newSelectedFilters);
    const productList = await getProductFilter(formattedFilters);
    setProducts(productList);
  };

  const clearFilters = async () => {
    setSelectedFilters({});
    await fetchData();
  };
  const handleSortChange = (option) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (option.name === "Price: Low to High") {
        return parseFloat(a.price.amount) - parseFloat(b.price.amount);
      } else if (option.name === "Price: High to Low") {
        return parseFloat(b.price.amount) - parseFloat(a.price.amount);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="  mx-auto ">
      {/* Left Category Section (Fixed) */}
      <div className=" rounded-lg shadow-lg ">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium ">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 "
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3  hover:text-gray-500">
                                <span className="font-medium ">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`filter-${section.id}-${option.value}`}
                                      name={section.id}
                                      value={option.value}
                                      checked={
                                        selectedFilters[section.id]?.includes(
                                          option.value
                                        ) || false
                                      }
                                      onChange={(e) =>
                                        handleFilterChange(
                                          section.id,
                                          option.value,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${option.value}`}
                                      className="ml-3 min-w-0 flex-1 "
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-24">
            <h1 className="text-4xl font-bold tracking-tight ">New Arrivals</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0  group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => handleSortChange(option)}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2  hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2  hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => clearFilters()}
                  >
                    Clear Filters
                  </button>
                </div>
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center text-gray-900 justify-between bg-white py-3 text-sm  hover:text-gray-500">
                            <span className="font-medium ">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={`filter-${section.id}-${option.value}`}
                                  name={section.id}
                                  value={option.value}
                                  checked={selectedFilters[
                                    section.id
                                  ]?.includes(option.value)}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      section.id,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${option.value}`}
                                  className="ml-3 min-w-0 flex-1 "
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 p-4">
                  {products.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-500">
                      No products found.
                    </div>
                  ) : (
                    products.map((product) => (
                      <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        className="group"
                      >
                        <div className=" relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <img
                            src={product?.images[0]}
                            alt=""
                            className="h-96 w-96 object-cover object-center group-hover:opacity-75"
                          />
                          <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                            <ButtonCart
                              text={"Detail"}
                              bgColor={"bg-primary"}
                              textColor={"text-white"}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <h3 className="mt-4 text-sm -700">
                              {product.name}
                            </h3>
                            <p className="mt-4 text-sm  bg-green-300 rounded-md p-2">
                              {product?.feedbacks?.length} feedbacks
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="mt-1 text-lg font-medium ">
                              {product?.price?.amount}{" "}
                              {product?.price?.currency}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ListProduct;
