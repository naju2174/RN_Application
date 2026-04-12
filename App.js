import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView
} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function buttonPressedHandler() {
    console.log("Button clicked");
    console.log("Entered text:", enteredGoalText);

    if (enteredGoalText.trim().length === 0) {
      return; // prevent empty input
    }

    setCourseGoals((currentValue) => [
      ...currentValue,
      { id: Date.now().toString(), text: enteredGoalText }
    ]);

    setEnteredGoalText(''); // clear input
  }

  console.log("Goals array:", courseGoals);

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          style={styles.textInputStyle}
          placeholder="Enter text here..."
        />
        <Button title="Submit" onPress={buttonPressedHandler} />
      </View>

      <ScrollView style={styles.goalListStyle}>
        {courseGoals.map((goal) => (
          <View key={goal.id} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal.text}</Text>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
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
  goalListStyle: {
    flex: 5,
  },
  goalItem: {
    backgroundColor: '#5e0acc',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
  },
  goalText: {
    color: '#ffffff',
  },
});