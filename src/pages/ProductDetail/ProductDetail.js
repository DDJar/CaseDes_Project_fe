import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  likeProduct,
  unlikeProduct,
} from "../../service/ProductService";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookies from "js-cookie";
import { AddItemToCart, GetListProductOnCard } from "../../service/CartService";
import {
  GetAllFeeback,
  CreateFeeback,
  EditFeeback,
  DeleteFeeback,
} from "../../service/feedBackService";
import { getUserById } from "../../service/UserService";
const ProductDetail = () => {
  let { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [openComent, setOpenComent] = useState(false);
  const navigate = useNavigate();
  const [userDetail, setuserDetail] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productData = await getProductById(id);
    console.log(productData);
    setProductDetail(productData);
    setActiveImage(productData.images[0]);

    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const userData = await getUserById(userId);
      setuserDetail(userData);
      const response = await GetListProductOnCard();
      const filteredResponse = response.filter(
        (item) =>
          item.productId._id === id &&
          item.userId === userId &&
          item.status === "paid"
      );
      if (filteredResponse.length > 0) {
        setOpenComent(true);
      }

      const userLike = productData.totalLike.find(
        (like) => like.userId === userId
      );
      setLiked(!!userLike);
    } else {
      setOpenComent(false);
    }

    const feedbackCheck = await GetAllFeeback();
    const filteredFeedBack = feedbackCheck.filter(
      (item) => item.product._id === id
    );

    const sortedFeedbacks = filteredFeedBack
      .filter((item) => item.product._id === id)
      .sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt).getTime();
        return timeB - timeA;
      })
      .map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
        updatedAt: item.updatedAt
          ? new Date(item.updatedAt).toLocaleDateString()
          : null,
      }));
    setComments(sortedFeedbacks);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const comment = {
        user: userId,
        product: id,
        content: newComment,
      };
      console.log(comment);
      // setComments([...comments, comment]);
      await CreateFeeback(comment.user, comment.product, comment.content);
      fetchData();
      setNewComment("");
    }
  };

  const handleProductLike = async () => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      console.log(userId);
      if (liked) {
        await unlikeProduct(id, userId);
        setLiked(false);
      } else {
        await likeProduct(id, userId);
        setLiked(true);
      }
      fetchData();
    }
  };
  const handleEditComment = (commentIndex, commentContent) => {
    setEditingCommentIndex(commentIndex);
    setEditContent(commentContent);
  };
  const handleDeleteComment = async (commentId) => {
    await DeleteFeeback(commentId);
    fetchData();
  };

  const handleSaveEdit = async (commentId) => {
    await EditFeeback(commentId, editContent);
    fetchData();
    setEditingCommentIndex(null);
    setEditContent("");
  };
  const handleCancelEdit = (commentIndex) => {
    setEditingCommentIndex(null);
    setEditContent("");
  };
  const handleAddToCart = () => {
    const userIdCookie = Cookies.get("userId");
    const userId = JSON.parse(userIdCookie);
    console.log(
      productDetail._id,
      amount,
      userId,
      amount * productDetail?.price?.amount
    );
    AddItemToCart(
      productDetail._id,
      amount,
      userId,
      amount * productDetail?.price?.amount,
      "unpaid"
    );
    navigate("/carts");
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pt-0">
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex flex-col gap-6 lg:w-2/5">
          <img
            src={activeImg}
            alt=""
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
          <div className="flex flex-row justify-start h-24 gap-3">
            {productDetail?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        {/* ABOUT */}
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className=" text-violet-600 font-semibold">
              {productDetail.phoneModel}
            </span>
            <h1 className="text-3xl font-bold">{productDetail.name}</h1>
          </div>
          <p className="text-gray-700">{productDetail.description}</p>
          <h6 className="text-2xl font-semibold">
            {productDetail?.price?.amount} {productDetail?.price?.currency}
          </h6>
          <div className="mx-auto flex flex-row items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev - 1)}
                disabled={amount === 1 ? true : false}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev + 1)}
                disabled={amount === productDetail.inventory ? true : false}
              >
                +
              </button>
            </div>
            <button
              className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </button>
          </div>
          <div className="mx-auto mt-5 flex">
            {openComent ? (
              <div className="flex items-center">
                {liked ? (
                  <>
                    <Icon
                      icon="fluent-emoji-flat:heart-suit"
                      width="30"
                      onClick={handleProductLike}
                    />
                    <span className="ml-1">
                      Like ({productDetail.totalLike.length})
                    </span>
                  </>
                ) : (
                  <>
                    <Icon
                      width="30"
                      icon="akar-icons:heart"
                      onClick={handleProductLike}
                    />
                    <span className="ml-1">
                      Like ({productDetail.totalLike.length})
                    </span>
                  </>
                )}
              </div>
            ) : (
              <>
                <Icon width="30" icon="akar-icons:heart" />
                <span className="ml-1">
                  Like (
                  {productDetail.totalLike ? productDetail.totalLike.length : 0}
                  )
                </span>
              </>
            )}
            <div className="ml-10 flex text-left">
              <Icon width="30" icon="ep:sold-out" />
              <p className="ml-2 mt-1">Sold({productDetail.bought || "0"})</p>
            </div>
          </div>
          <div className="mt-3 p-5 border-2 rounded-md flex">
            <div className="w-1/3 text-slate-400 flex flex-col items-start gap-2">
              <p>Brand</p>
              <p>Model</p>
              <p>Material</p>
              <p>Stock</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p>{productDetail.brand}</p>
              <p>{productDetail.phoneModel}</p>
              <p>{productDetail.material}</p>
              <p>{productDetail.inventory}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <section className="mt-16 lg:mt-0 bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased lg:w-3/5">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comment
              </h2>
            </div>
            {openComent ? (
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <textarea
                    id="comment"
                    rows="6"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Send comment
                  </button>
                </div>
              </form>
            ) : (
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <input
                    id="comment"
                    rows="6"
                    className="px-0 w-full h-20 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder=""
                    disabled={true}
                  />
                </div>
              </form>
            )}

            <div className="max-h-85 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion ({comments.length})
                </h2>
              </div>
              {comments.map((comment, commentIndex) => (
                <article
                  key={comment._id}
                  className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`https://case-shop-be.onrender.com/imageUpload/${comment.user.imgAvt}`}
                        alt="Jese Leos"
                      />
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        {comment.user.firstName + " " + comment.user.lastName}
                      </p>

                      {comment.updatedAt ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {comment.updatedAt}{" "}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {comment.createdAt}{" "}
                        </p>
                      )}
                    </div>

                    {comment.user._id === userDetail._id ? (
                      <div>
                        <button
                          onClick={() =>
                            handleEditComment(commentIndex, comment.content)
                          }
                          className="text-blue-500 hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:underline mt-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : null}
                  </footer>
                  {editingCommentIndex === commentIndex ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSaveEdit(comment._id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleCancelEdit(commentIndex)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-left">
                      {comment.content}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
