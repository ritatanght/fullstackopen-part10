import { useState } from "react";
import { Menu, Provider, Button } from "react-native-paper";

const OrderingSelector = ({ repoRefetch }) => {
  const [visible, setVisible] = useState(false);
  const [orderingType, setOrderingType] = useState("Latest repositories");
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelected = (selected) => {
    setOrderingType(selected);
    if (selected === "Highest rated repositories") {
      repoRefetch({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
    } else if (selected === "Lowest rated repositories") {
      repoRefetch({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
    } else {
      repoRefetch({ orderBy: "CREATED_AT", orderDirection: "DESC" });
    }
    closeMenu();
  };

  return (
    <Provider theme={{ dark: false }}>
      <Menu
        visible={visible}
        style={{ top: 0 }}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            icon="menu-down"
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            {orderingType}
          </Button>
        }
      >
        <Menu.Item title="Select an item..." disabled />
        <Menu.Item
          onPress={() => handleSelected("Latest repositories")}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => handleSelected("Highest rated repositories")}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => handleSelected("Lowest rated repositories")}
          title="Lowest rated repositories"
        />
      </Menu>
    </Provider>
  );
};

export default OrderingSelector;
