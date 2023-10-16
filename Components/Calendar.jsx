import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar as CalendarComponent } from "react-native-calendars";
import moment from "moment";

const Calendar = () => {
  const [selected, setSelected] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    let date = moment(selected.timestamp);
    let outputString = "";
    outputString += `Selected Date: ${date.format("DD/MM/YYYY")}`;
    outputString += `\nDay of the week: ${date.format("dddd")}`;
    outputString += `\nDay of the year: ${date.format("DDDD")}`;
    outputString += `\nWeek of the year: ${date.format("WW")}`;
    outputString += `\nMonth of the year: ${date.format("MM")} (${date.format(
      "MMMM",
    )})`;
    outputString += `\nYear: ${date.format("YYYY")}`;
    setOutput(outputString);
  }, [selected]);

  return (
    <View style={styles.mainContainer}>
      <CalendarComponent
        markedDates={{
          [selected.dateString]: {
            selected: true,
            selectedColor: "teal",
            selectedTextColor: "#fff",
          },
        }}
        onDayPress={day => {
          setSelected(day);
        }}
        theme={theme}
      />
      <View style={styles.outputContainer}>
        <Text style={styles.outputText}>{output}</Text>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  outputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outputText: {
    fontSize: 18,
    color: "#fff",
  },
});

const theme = {
  backgroundColor: "#1e1e1e",
  calendarBackground: "#1e1e1e",
  textSectionTitleColor: "#fff",
  selectedDayBackgroundColor: "teal",
  dayTextColor: "#fff",
  textDisabledColor: "#888",
  todayTextColor: "teal",
  monthTextColor: "#fff",
  arrowColor: "teal",
};
