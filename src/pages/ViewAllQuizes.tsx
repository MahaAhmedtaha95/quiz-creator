import React, { useState } from 'react';
import Quiz from '../components/Quiz.tsx';
import Button from 'react-bootstrap/Button';
import { data } from '../data.ts';
function AllQuizes() {
  const [quizzes, setQuizzes] = useState(data);
  const [viewType,setViewType]=useState("VIEW")
  const [indextoBeChanged,setIndextoBeChanged]=useState(null)
  // Function to add a new quiz
  const addQuiz = () => {
    // Create a new quiz object with default values
    const newQuiz = {
      title: null,
      description: null,
      finalScore: null,
      videoUrl: null,
      questions_answers: [{
        text: null,
        feedback_false: null,
        feedback_true: null,
        answers: [
          
        ]
      }],
    };
    // Generate a unique ID for the new quiz
    newQuiz.id = quizzes.length;
    // Add the new quiz to the list of quizzes
    setQuizzes([...quizzes, newQuiz]);
    setViewType("EDIT")
    setIndextoBeChanged(quizzes.length)
  };
  const onEditClicked=(value)=>{
    setViewType(value)
  }

  const onQuizChanged = (newQuiz, quizIndex) => {
    const updatedQuizzes = [...quizzes]; // Create a copy of the quizzes array
    updatedQuizzes[quizIndex] = newQuiz; // Update the quiz at the specified index
    // Update the list of quizzes
    setQuizzes(updatedQuizzes);
  };
  return (
    <div>
      <h1>Quizzes</h1>
      <Button variant="primary" type="submit" onClick={addQuiz}>
        Add Quiz
      </Button>
      {quizzes.map((quiz,index) => (
        <div key={quiz.id} >
          <Quiz quiz={quiz} viewType={viewType} 
           onClickEdit={onEditClicked}
           indextoBeChanged={indextoBeChanged} quizIndex={index}
           onQuizChanged={onQuizChanged}
           />
        </div>
      ))}
    </div>
  )
}

export default AllQuizes;