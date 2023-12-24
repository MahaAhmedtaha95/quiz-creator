import React, { useState, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import './Quiz.css'
interface Answers {
    id: number;
    is_true: boolean;
    text: string | null;
}

interface AnswerProps {
    answer: Answers;
    onAnswerChange,
    questionIndex,
    viewType,
    indextoBeChanged,
    quizIndex,
}
const Answer: React.FC<AnswerProps> = ({ answer, onAnswerChange, questionIndex, viewType, indextoBeChanged, quizIndex }) => {

    const [answers, setAnswers] = useState<Answers[]>(answer);
    // Function to add a new quiz
    const addAnswer = () => {
        const newAnswer: Answer = {
            id: answers.length,
            is_true: false,
            text: null,
        };

        setAnswers([...answers, newAnswer]);
    };
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAnswers = answers.map((ans, i) => {
            if (i === index) {
                return {
                    ...ans,
                    [name]: value,
                    is_true: name.includes('is_true') ? value : null
                };
            }
            return ans;
        });
        console.log("updatedAnswers:", updatedAnswers)
        setAnswers(updatedAnswers);
        onAnswerChange(updatedAnswers, questionIndex)
    };

    return (
        <Row>
            <Col lg="11" md="11" >
                <p>Answers</p>
                {answers.map((answer, index) => (
                    <div className="answer-container">
                        {console.log("answeranswer:", answer)}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>answer text </Form.Label>
                            <Form.Control type="text" placeholder="Enter answer text"
                                disabled={viewType === "EDIT" && indextoBeChanged === quizIndex ? false : true}
                                defaultValue={answer.text} name="text" onChange={(e) => handleChange(e, index)} />
                        </Form.Group>
                        <Form.Group controlId={`answer${index}`}>
                            <Form.Label>answer Value </Form.Label>
                            <Form.Check
                                value={answer.is_true}
                                type="radio"
                                aria-label="radio 1"
                                label="True"
                                name={`is_true_${index}`}
                                onChange={(e) => handleChange(e, index)} disabled={viewType === "EDIT" && indextoBeChanged === quizIndex ? false : true}
                                checked={answer.is_true}
                            />
                            <Form.Check
                                value={answer.is_true}
                                type="radio"
                                aria-label="radio 1"
                                label="False"
                                name={`is_true_${index}`}
                                onChange={(e) => handleChange(e, index)}
                                checked={!answer.is_true}
                                disabled={viewType === "EDIT" && indextoBeChanged === quizIndex ? false : true}
                            />
                        </Form.Group>
                    </div>
                ))}
            </Col>
            <Col lg="1" md="1">
                <Button variant="primary" onClick={addAnswer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                </Button>
            </Col>

        </Row>
    );
};

export default Answer;