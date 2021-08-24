import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlowers: []
    }
  }

  componentDidMount = async () => {
    axios.get(`${process.env.REACT_APP_SERVER}/allFlowers`).then(axiosRes => {
      this.setState({
        allFlowers: axiosRes.data
      })
    }).catch(error => console.log(error.message))
  }

  addToFav = async (flower) => {
    const reqBody = {
      name: flower.name,
      photo: flower.photo,
      instructions: flower.instructions

    }
    await axios.post(`${process.env.REACT_APP_SERVER}/fav`,reqBody)
  }

  render() {


    return (
      <>
        <h1>API Flowers</h1>
        <Row>
          {this.state.allFlowers.map(flower => {
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
                    <Button variant='primary' onClick={() => this.addToFav(flower)}>
                      Add to Fav
                    </Button>


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

export default Home;
