import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import './Quiz.css'
import Question from './Question.tsx';
import Accordion from 'react-bootstrap/Accordion';

const Quiz = ({ quiz, viewType, indextoBeChanged, quizIndex, onClickEdit }) => {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [url, setUrl] = useState(quiz.url);
  const [score, setScore] = useState(quiz.score);
  const [editFalg, setEditFlag] = useState(viewType)
  const [editeQuizeIndex, setEditeQuizeIndex] = useState(indextoBeChanged)
  const handleChange = (e) => {
    let editedQuiz = quiz
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        editedQuiz.title = value
        break;
      case 'description':
        setDescription(value);
        editedQuiz.description = value
        break;
      case 'url':
        setUrl(value);
        editedQuiz.url = value
        break;
      case 'score':
        setScore(value);
        editedQuiz.score = value
        break;
      default:
        break;
    }
  }
  // Function to edit an existing quiz
  const editQuiz = (quizId, quizIndex) => {
    // Find the quiz to be edited based on its ID
    setEditFlag("EDIT")
    onClickEdit("EDIT")
    setEditeQuizeIndex(quizIndex)
  };
  const embedVideo = () => {
    let videoURL = url
    const regex = /[?&]v=([^&#]*)/i;
    const match = videoURL.match(regex);
    const videoId = match && match[1];
    let newURL = `https://www.youtube.com/embed/${videoId}?rel=0`
    return newURL
  }
  return (
    <Row className='quiz-container p-2 mt-2'>
      <Col lg="12" md="12">
        <span onClick={() => editQuiz(quiz.id, quizIndex)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </span>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {title}

            </Accordion.Header>
            <Accordion.Body>
              <Form className='text-start'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" name="title"
                    defaultValue={title} onChange={(e) => handleChange(e)}
                    disabled={(viewType === "EDIT" || editFalg === "EDIT") && (indextoBeChanged === quizIndex || editeQuizeIndex === quizIndex) ? false : true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Quiz Discription</Form.Label>
                  <Form.Control type="text" placeholder="Enter discription" name="description"
                    defaultValue={description} onChange={(e) => handleChange(e)}
                    disabled={(viewType === "EDIT" || editFalg === "EDIT") && (indextoBeChanged === quizIndex || editeQuizeIndex === quizIndex) ? false : true}
                  />
                </Form.Group>
                <Form.Group className="mt-1 upload-media-container" >
                  <Form.Label className="text-center">
                    <span className="upload-med-hint">
                      Video url
                    </span>
                  </Form.Label>
                  <Form.Control type="text " placeholder="Enter video url" name="url"
                    defaultValue={url} onChange={(e) => handleChange(e)}
                    disabled={(viewType === "EDIT" || editFalg === "EDIT") && (indextoBeChanged === quizIndex || editeQuizeIndex === quizIndex) ? false : true}
                  />
                  {url &&
                    <div className="embed-responsive embed-responsive-16by9 mt-2">
                      <iframe
                        className="embed-responsive-item"
                        src={embedVideo()}
                        allow="autoplay; fullscreen"
                        title={title}
                      ></iframe>
                    </div>}
                </Form.Group>
                <div className='questions-container p-2 my-2'>
                  <Question key={title} question={quiz.questions_answers} viewType={editFalg} indextoBeChanged={editeQuizeIndex} quizIndex={quizIndex} />
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Final Score</Form.Label>
                  <Form.Control type='number' placeholder="Enter final score" name="score"
                    defaultValue={score} onChange={(e) => handleChange(e)}
                    disabled={(viewType === "EDIT" || editFalg === "EDIT") && (indextoBeChanged === quizIndex || editeQuizeIndex === quizIndex) ? false : true}
                  />
                </Form.Group>
                {(viewType === "EDIT" || editFalg === "EDIT") && <Button variant="primary" type="submit">
                  Submit
                </Button>}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>

    </Row>
  );
};

export default Quiz;
