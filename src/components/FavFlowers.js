import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateForm from './UpdateForm';

class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      showModal:false,
      flowerObj:[],
      name:'',
      photo:'',
      instructions:''
    }
  }
  componentDidMount = async () => {
    axios.get(`${process.env.REACT_APP_SERVER}/fav`).then(axiosRes => {
      this.setState({
        favFlowers: axiosRes.data
      })
    }).catch(error => console.log(error.message))
  }

  deleteFromFav = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER}/fav/${id}`).then(axiosRes=>{
      if(axiosRes.data.ok !==0){
        const newFlowersArr=this.state.favFlowers.filter(flower=>flower._id!==id);
        this.setState({
          favFlowers:newFlowersArr
        })
      }
    }).catch(error=>console.log(error.message))
  }

  handleModal=()=>{
    this.setState({
      showModal: !this.state.showModal
    })
  }

  submitUpdateForm=async(e)=>{
    e.preventDefault();
    const id=this.state.favFlowers._id;
    const body={
      name:e.target.name.value,
      photo:e.target.image.value,
      instructions:e.target.instructions.value,
    }
axios.put(`${process.env.REACT_APP_SERVER}/favFlower/${id}`,body)
this.handleModal();
  }

  render() {
    return (
      <>
        <h1>My Favorite Flowers</h1>
        <Row>
          {this.state.favFlowers.map(flower => {
            return (
              <Col lg={3}>
                <Card style={{ width: '15rem', height: '34rem', marginBlock: '2rem', marginLeft: '2rem' }}>
                  <Card.Img src={flower.photo} style={{ width: '15rem', height: '16rem' }} />
                  <Card.Body>
                    <Card.Title>
                      {flower.name}
                    </Card.Title>
                    <Card.Text>
                      {flower.instructions}
                    </Card.Text>
                    <Button variant='primary' onClick={() => this.deleteFromFav(flower._id)}>
                      Delete
                    </Button>
                    <Button variant='primary' style={{backgroundColor:'red'}} onClick={this.handleModal}>
                      Update
                    </Button>
                  {
                    this.state.showModal &&
                    <UpdateForm
                    show={this.state.showModal}
                    handleClose={this.handleModal}
                    submitUpdateForm={this.submitUpdateForm}
                    flowers={this.state.favFlowers}
                    flowerObj={this.state.flowerObj}
                    name={flower.name}
                    photo={flower.photo}
                    instructions={flower.instructions}
                    
                    />
                  }


                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </>
    )
  }
}

export default FavFlowers;
