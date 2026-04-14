import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

let goalIdCounter = 0;

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);


  // This function is called when the button in GoalInput is pressed. It receives the entered text as an argument and adds it to the courseGoals state array.

  function buttonPressedHandler(enteredGoalText) {
    console.log("Button clicked");
    console.log("Entered text:", enteredGoalText);
    setCourseGoals((currentValue) => [
      ...currentValue,
      { id: (++goalIdCounter).toString(), text: enteredGoalText }
    ]);
  }

  console.log("Goals array:", courseGoals);

  return (
    <View style={styles.appContainer}>
  
      <GoalInput onAddGoal = {buttonPressedHandler} />
      <FlatList
        style={styles.goalListStyle}
        data={courseGoals}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
        return <GoalItem text={item.text} />
        }}
      />
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
  
  
  goalListStyle: {
    flex: 5,
  },
 
});