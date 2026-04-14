import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";


function GoalInput(props) {
const [enteredGoalText, setEnteredGoalText] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  //to pass the entered text to the parent component (App.js) when the button is pressed
  // This function is called when the button in GoalInput is pressed. It receives the entered text as an argument and adds it to the courseGoals state array. Also receives the event object as an argument, which can be used for debugging or to access event details if needed.
  function addGoalHandler(event) {
    // console.log("onPress event:", event);
    if (enteredGoalText.trim().length === 0) {
      Alert.alert("Invalid Input", "Please enter a goal before submitting.", [{ text: "OK" }]);
      return;
    }
    // Call the onAddGoal function passed from the parent component with the entered text.
    //onAddGoal is a prop that is expected to be a function passed from the parent component (App.js). When the button in GoalInput is pressed, this function is called with the enteredGoalText as an argument, allowing the parent component to receive and handle the new goal text.

    props.onAddGoal(enteredGoalText);
    setEnteredGoalText(''); // Clear the input field after adding the goal
  }

return (
  <View style={styles.inputContainer}>
        <TextInput
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          style={styles.textInputStyle}
          placeholder="Enter text here..."
        />
        <Button title="Submit" onPress={addGoalHandler} />
      </View>
)
};
export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 24,
    alignItems: 'center',
    paddingBottom: 12,
  },
  textInputStyle: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 8,
  }, 
});