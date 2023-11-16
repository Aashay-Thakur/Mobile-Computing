import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";

const Result = ({ route }) => {
  const { data, selection } = route.params;
  var score = data.reduce((acc, item) => {
    if (item.answer == selection[item.id].option) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>{"Score: " + score}</Text>
        {data.map((item, i) => {
          return (
            <View key={item.id} style={styles.questionContainer}>
              <View style={styles.questionView}>
                <Text style={styles.questionText}>{item.question}</Text>
              </View>
              <View style={styles.optionsContainer}>
                {item.options.map((option, i) => {
                  let optionStyle = [styles.optionView];
                  if (
                    selection[item.id]?.option == option &&
                    selection[item.id]?.option == item.answer
                  ) {
                    optionStyle.push({
                      backgroundColor: "teal",
                    });
                  } else if (
                    selection[item.id]?.option == option &&
                    selection[item.id]?.option != item.answer
                  ) {
                    optionStyle.push({
                      backgroundColor: "#ff3333",
                    });
                  } else {
                    optionStyle.push({
                      backgroundColor: "#333",
                    });
                  }

                  return (
                    <View key={i} style={optionStyle}>
                      <Text style={styles.optionText}>{option}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 12,
  },
  questionContainer: {
    elevation: 5,
    padding: 10,
  },
  questionView: {
    marginBottom: 12,
  },
  questionText: {
    fontSize: 24,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  optionView: {
    marginBottom: 12,
    flexBasis: "45%",
    backgroundColor: "#333",
    borderRadius: 5,
  },
  optionText: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
  },
});
