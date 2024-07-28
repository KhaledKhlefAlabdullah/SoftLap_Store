import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SEARCH } from "../REGEX_And_APIs";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Serch_Box() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [searchVisibile, setSearchVisibile] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = async () => {
    if (searchInput.length === 0) {
      return;
    }

    try {
      const response = await axios.get(`${SEARCH}?search_input=${searchInput}`);
      const data = response.data;
      console.log(data);
      if (data.resulte.length > 0) {
        setSearchResults(data.resulte);
        setMessage(data.message);
        console.log(searchResults + " results");
      } else {
        setSearchResults([]);
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (e) => {
      // Clicked outside the search container
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchVisibile(false);
        // Clear the search input
        setSearchInput("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div class="search-box ml-4 position-relative" ref={searchRef}>
      <button class="btn-search" onClick={handleSearch}>
        <i class="fas fa-search"></i>
      </button>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          handleSearch();
        }}
        class="input-search"
        placeholder="أكتب للبحث..."
      />
      {!searchVisibile && (
        <Container
          className={`position-absolute bg-section-color rounded search-list ${
            !searchInput ? "hide" : ""
          }`}
        >
          <Container>
            <ul>
              {searchResults.map((item) => (
                <li key={item.id}>
                  <Row className="d-flex align-items-center justify-content-between">
                  <Container className="col-6">
                  {item.product_name} - {item.product_description}
                  </Container>
                 <Container className="col-6">
                 <Link className="btn my-box-shadow rounded-circle" to={`/product-details/${item.id}`} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg></Link>
         
                 </Container>
                  </Row>
                  
                </li>
              ))}
            </ul>
          </Container>
        </Container>
      )}
    </div>
  );
}
