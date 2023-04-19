import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
const SearchBar = ({ repoRefetch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);

  useEffect(() => {
    repoRefetch({ searchKeyword });
  }, [searchKeyword]);

  return (
    <Searchbar
      placeholder="Search"
      style={{ backgroundColor: "white", margin: 5 }}
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
    />
  );
};

export default SearchBar;
