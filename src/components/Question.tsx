import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Answer from './Answer.tsx';
import { Row, Col } from 'react-bootstrap';
import './Quiz.css'
interface QuestionProps {
  question: Questions;
}

const Question: React.FC<QuestionProps> = ({ question,viewType,indextoBeChanged, quizIndex,onQuestionsChange }) => {
  const [questions, setQuestions] = useState<Questions[]>(question);

  // Function to add a new quiz
  const addQuestion = () => {
    // Create a new quiz object with default values
    const newQuestion = {
      text: null,
      feedback_false: null,
      feedback_true: null,
      answers: [
      ]
    };
    // Generate a unique ID for the new quiz
    newQuestion.id =  questions.length;
    // Add the new quiz to the list of quizzes
    setQuestions([...questions, newQuestion]);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = questions.map((question, i) => {
        if (i === index) {
            return {
                ...question,
                [name]: value,
            };
        }
        return question;
    });
    setQuestions(updatedQuestions);
};
const updateAnswers = (newAnswers: Answer[], questionIndex: number) => {
  setQuestions((prevQuestions) => {
    const updatedQuestions = [...prevQuestions];
    const updatedQuestion = { ...updatedQuestions[questionIndex] };
    updatedQuestion.answers = newAnswers;
    updatedQuestions[questionIndex] = updatedQuestion;
    return updatedQuestions;
  });
  onQuestionsChange(questions,quizIndex)

};

  return (
    <Row>
      <Col lg="11" md="11">
      <p>Questions</p>
        {
          questions.map((question,index) => {
            return (
              <Form className='text-start question-form p-2 my-2'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter question text" name="text" 
                  defaultValue={question.text} 
                  disabled={viewType==="EDIT"&&indextoBeChanged===quizIndex?false:true}                   
                  onChange={(e) => handleChange(e, index)}/>
                </Form.Group>
                <Answer onAnswerChange={updateAnswers} questionIndex={index} answer={question.answers} viewType={viewType} indextoBeChanged={indextoBeChanged} quizIndex={quizIndex}/>
                <p>Feedback</p>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter false feedback" 
                    defaultValue={question.feedback_false} disabled={viewType==="EDIT"&&indextoBeChanged===quizIndex?false:true}
                  name="feedback_false" onChange={(e) => handleChange(e, index)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter false feedback" name="feedback_true"
                   defaultValue={question.feedback_true}  disabled={viewType==="EDIT"&&indextoBeChanged===quizIndex?false:true}
                  onChange={(e) => handleChange(e, index)}/>
                </Form.Group>
              </Form>
            )
          })
        }
      </Col>
      <Col lg="1" md="1">
        <Button variant="primary" onClick={addQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>
        </Button>
      </Col>
    </Row>
  );
};

export default Question;