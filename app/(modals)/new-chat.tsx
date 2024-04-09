import { View, Text, StyleSheet, Image } from "react-native";

import { AlphabetList } from "react-native-section-alphabet-list";

import Colors from "@/constants/Colors";
import contacts from "@/assets/data/contacts.json";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const data = contacts.map(({ img, desc, first_name, last_name }, index) => ({
    img,
    desc,
    name: `${first_name} ${last_name}`,
    value: `${first_name} ${last_name}`,
    key: `${first_name} ${last_name}-${index}`,
  }));

  return (
    <View style={{ backgroundColor: Colors.background }}>
      <AlphabetList
        data={data}
        style={{ marginLeft: 14 }}
        stickySectionHeadersEnabled
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator]} />
        )}
        indexLetterStyle={styles.indexLetterStyle}
        indexContainerStyle={styles.indexContainerStyle}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderCustomItem={(item: any) => (
          <View style={styles.listItemContainer}>
            <Image
              source={{ uri: item.img }}
              width={40}
              height={40}
              borderRadius={40}
            />
            <View>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {item.value}
              </Text>

              <Text>
                {item.desc.length > 40
                  ? `${item.desc.substring(0, 40)}...`
                  : item.desc}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },

  sectionHeaderContainer: {
    height: 30,
    paddingHorizontal: 14,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  indexLetterStyle: {
    width: 20,
    fontSize: 12,
    textAlign: "center",
    color: Colors.primary,
  },

  indexContainerStyle: {
    width: 24,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

export default Page;
