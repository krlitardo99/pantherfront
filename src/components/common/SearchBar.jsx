import {
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";



const SearchBar = ({
  searchText,
  setSearchText,
  onSearch,
  placeholder = "Buscar..."
}) => {

  const handleSearch = () => {

    if (onSearch) {
      onSearch(searchText);
    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

  };

  return (
    <InputGroup className="mb-3">

      <FormControl
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        variant="primary"
        onClick={handleSearch}
      >
        <span>Buscar</span>
      </Button>

    </InputGroup>
  );
};

export default SearchBar;