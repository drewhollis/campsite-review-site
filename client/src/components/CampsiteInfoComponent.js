import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Col, Row, Modal, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    class CommentForm extends Component {
        
        constructor(props) {
            super(props);
   
            this.state = {
              isModalOpen: false,
              rating: " ",
              author: " ",
              text: " "
            };

            this.toggleModal = this.toggleModal.bind(this);

            this.handleInputChange = this.handleInputChange.bind(this); // allows us to use the this keyword inside handleInputChange and have it point to the correct object
            this.handleSubmit = this.handleSubmit.bind(this); // allows us to use the this keyword inside handleSubmit and have it point to the correct object
          }

        handleInputChange(event) {

        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
            //console.log('Current state is: ' + JSON.stringify(this.state)); // allows us to make a string from a JS object
            //alert('Current state is: ' + JSON.stringify(this.state)); // just added so we get an alert in addition to a console log
            //event.preventDefault(); // stops entire page from refreshing 
        }
          
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

        render() {
            return (
            <React.Fragment>
                <Row className="form-group">
                <Col>
                    <Button onClick={this.toggleModal} type="submit" color="primary" className="fa-fa-pencil fa-lg" outline>
                        Submit Comment
                    </Button>
                </Col>
            </Row>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select className="form-control" model=".rating" id="rating" name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text className="form-control" model=".author" id="author" name="author"
                                validators={{
                                    required, 
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}                            
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </div>
                        <div className="form-group">
                        <Label htmlFor="text">Comment</Label>
                            <Control.textarea className="form-control" model=".text" id="text" name="text" rows="6" />
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">Submit</Button>
                        </div>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
            );
        }
    };


    function RenderComments({comments, postComment, campsiteId}) {
        if (comments) {
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
                        <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
            );  
        }
            return <div />;
    }


    function RenderCampsite({campsite}){
        return(
            <div className='col-md-5 m-1'>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform> 
            </div>
        )
    }

    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
        return <div />;
    }



export default CampsiteInfo; 