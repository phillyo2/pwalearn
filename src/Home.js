import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';

class Home extends React.Component {
  render = () =>
    <div style={{maxWidth: "500px", marginRight: "auto", marginLeft: "auto", marginTop: "170px"}}>
      <Card>
        <CardTitle>Home</CardTitle>
        <CardText>Hopefully this was a good LnL</CardText>
      </Card>
    </div>
}

export default Home;
