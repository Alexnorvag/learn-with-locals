import React, { useRef } from "react";

const Book = ({ books = [{ title: "First" }] }) => {
  const titleRef = useRef("");

  const submitBook = (input) => {
    console.log("submitted: ", input.value);
  };

  return (
    <div>
      <h3>Books</h3>
      <ul>
        {books.map((book, i) => (
          <li key={i}>{book.title}</li>
        ))}
      </ul>
      <div>
        <h3>Books Form</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
          }}
        >
          <input type="text" name="title" ref={titleRef} />
          <button onClick={() => submitBook(titleRef.current)}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default Book;
