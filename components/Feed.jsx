"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  dataSearch,
  handleTagClick,
  searchText,
  tagSearched,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {searchText.length > 0 ||
        (tagSearched.length > 0 &&
          dataSearch.map((post) => (
            <PromptCard
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          )))}
      {searchText.length === 0 &&
        tagSearched.length === 0 &&
        data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [tagSearched, setTagSearched] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setTagSearched(tag);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      const filtration = posts.filter(
        (item) =>
          item.prompt.startsWith(searchText) ||
          item.tag.startsWith(`#${searchText}`) ||
          item.creator.username.startsWith(searchText)
      );
      setDataSearch(filtration);
    }
    if (tagSearched.length > 0) {
      const filtration = posts.filter((item) => item.tag == tagSearched);
      console.log(filtration);
      setDataSearch(filtration);
    }
  }, [searchText, tagSearched]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {tagSearched.length > 0 && (
        <div className="">
          <div className="bg-cyan-600 py-1 px-4 text-gray-50 rounded-full relative  ">
            <div
              className="
        absolute top-[-5px] 
        right-[-10px] 
        bg-gray-300  
        px-2 
        rounded-full 
        text-center 
        text-cyan-600 
        cursor-pointer"
              onClick={() => setTagSearched("")}
            >
              x
            </div>
            <p>{tagSearched}</p>
          </div>
        </div>
      )}

      <PromptCardList
        data={posts}
        dataSearch={dataSearch}
        handleTagClick={handleTagClick}
        searchText={searchText}
        tagSearched={tagSearched}
      />
    </section>
  );
};

export default Feed;
