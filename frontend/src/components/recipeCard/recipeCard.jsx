import React, { useContext, useEffect, useState } from "react";
import "./recipeCard.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";

const RecipeCard = ({ recipe }) => {
  const { userData } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(recipe.images[0].image_url);
  const [comment, setComment] = useState("");
  const [userliked, setUserliked] = useState(false);
  const [planDate, setPlanDate] = useState("");
  const userIsLiked = () => {
    recipe.likes.map((like) => {
      if (like.user_id === userData.id) {
        setUserliked(true);
      } else {
        setUserliked(false);
      }
    });
  };
  const handlePlanData = async () => {
    const data = new FormData();
    data.append("recipe_id", recipe.id);
    data.append("date", planDate);
    try {
      const response = axios.post(`http://127.0.0.1:8000/api/add_plan`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async () => {
    try {
      if (!userliked) {
        await axios.get(`http://127.0.0.1:8000/api/add_like/${recipe.id}`);
      } else {
        await axios.delete(
          `http://127.0.0.1:8000/api/remove_like/${recipe.id}`
        );
      }
      setUserliked(!userliked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userIsLiked();
  }, []);

  const handleImageClick = (index) => {
    setImage(recipe.images[index].image_url);
  };
  const addToList = () => {
    try {
      const response = axios.get(
        `http://127.0.0.1:8000/api/add_to_list/${recipe.id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = () => {
    const data = new FormData();
    data.append("recipeId", recipe.id);
    data.append("content", comment);
    try {
      const response = axios.post(
        `http://127.0.0.1:8000/api/add_comment`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="full-card">
      <div className="recipe-card">
        <div className="top-side">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer icon"
            onClick={() => {
              handleLike();
            }}>
            <path
              d="M895.36 243.904a251.52 251.52 0 0 0-355.776 0l-20.096 20.096-20.096-20.096A251.52 251.52 0 0 0 143.616 599.68S466.24 926.72 512 928c14.336 0.384 86.4-59.52 164.224-128.192l-0.512-0.64a22.016 22.016 0 0 0-11.968-40.896 21.76 21.76 0 0 0-14.784 5.888l-0.064-0.064 62.336-56.832a22.08 22.08 0 0 0-7.808 16.704 22.4 22.4 0 0 0 22.4 22.464c5.44 0 10.24-2.176 14.208-5.44l0.256 0.32 50.048-45.76-0.448-0.448a22.08 22.08 0 0 0-16.768-36.992 21.952 21.952 0 0 0-14.656 5.824l80.384-73.472 0.512 0.512a22.08 22.08 0 0 0-5.696 14.592 22.4 22.4 0 0 0 22.4 22.464 22.016 22.016 0 0 0 14.272-5.504l0.32 0.384 24.832-23.168a251.776 251.776 0 0 0-0.128-355.84z"
              fill=""
            />
            <path
              d="M510.976 878.656c-51.008-33.344-207.168-180.416-335.488-310.528a206.976 206.976 0 0 1-0.192-292.544c39.04-39.104 91.008-60.608 146.24-60.608s107.136 21.504 146.176 60.544l51.84 51.84 51.84-51.776c39.04-39.04 90.944-60.544 146.176-60.544s107.2 21.504 146.176 60.544c39.04 39.04 60.544 90.944 60.544 146.24s-21.504 107.136-60.544 146.176c-140.096 131.776-301.76 276.032-352.768 310.656z"
              fill={userliked ? "#FF5F5F" : "#fcfcfc"}
            />
            <path
              d="M308.032 641.984a15.872 15.872 0 0 1-10.112-3.648 757.12 757.12 0 0 1-53.504-48.896 875.968 875.968 0 0 0-25.856-24.64C141.376 495.488 145.344 423.616 145.536 420.544 143.808 318.976 237.376 264.64 241.344 262.4a16 16 0 0 1 15.808 27.84c-0.832 0.448-81.088 47.488-79.744 131.2-0.064 3.648-2.368 61.248 62.528 119.552 8.704 7.808 17.536 16.448 26.816 25.536 15.616 15.36 31.808 31.168 51.328 47.104a15.936 15.936 0 1 1-10.048 28.352zM422.656 751.36a15.872 15.872 0 0 1-11.2-4.544l-61.312-60.032a16 16 0 1 1 22.4-22.912l61.312 60.032a16 16 0 0 1-11.2 27.456z"
              fill="#FFFFFF"
            />
          </svg>
          <div
            className="open"
            onClick={() => {
              setOpen(!open);
            }}>
            {open ? (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white" />
                <path
                  d="M14.5 17L9.5 12L14.5 7"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white" />
                <path
                  d="M9.5 7L14.5 12L9.5 17"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <h1 className="recipe-title">{recipe.name}</h1>
        <p className="recipe-details">Cuisine: {recipe.cuisine}</p>
        <p className="recipe-details">Created by: {recipe.user.name}</p>
        <div className="image-container">
          <img src={image} className="recipe-image " alt="" srcset="" />
          <div className="circle-container">
            {recipe.images.map((image, index) => (
              <div
                className="circle"
                onClick={() => handleImageClick(index)}></div>
            ))}
          </div>
        </div>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredient.name} - {ingredient.ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
      {open ? (
        <div className="right-side">
          <div className="right-section">
            <div className="comment-section">
              {recipe.comments.map((comment) => {
                console.log(comment);
                return (
                  <div className="comment">
                    <div className="user-comment">{comment.user.name}</div>
                    <div className="content-comment">{comment.content}</div>
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              name=""
              id="add-comment"
              placeholder="write you comment here..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className="add-button" onClick={addComment}>
              Add Comment
            </button>
          </div>
          <div className="buttons">
            <button className="add-button" onClick={addToList}>
              Add To List
            </button>
            <div className="calendar">
              <button onClick={handlePlanData}>Add To calendar</button>
              <input
                type="date"
                name="date"
                onChange={(e) => {
                  setPlanDate(e.target.value);
                }}
              />
            </div>
            <div className="share-icons">
              <FacebookShareButton
                url={"https://www.example.com"}
                quote={"Dummy text!"}
                hashtag="#muo">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={"https://www.example.com"}
                quote={"Dummy text!"}
                hashtag="#muo">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RecipeCard;
