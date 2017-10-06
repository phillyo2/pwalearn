import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import {TextField, Snackbar} from 'material-ui';
import FirebaseMessaging from './FirebaseMessaging';

class Notify extends React.Component {
  constructor(props) {
    super(props);

    this.message = new FirebaseMessaging(Object.assign({'messagingSenderId': "711999737502"}, {
      handleMessage: this.handleMessage.bind(this)
    }));

    this.state = {
      token: '',
      toast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    this.message.requirestPermission().then(token => {
      this.setState({token})
    })
    .catch(err => {
      console.log(err)
    });
  }

  handleMessage = ({notification: {title = 'Title', body = 'Body'} = {}}) => {
    this.setState({
      toast: true,
      toastMessage: `${title}: ${body}`
    });
  }

  render() {
    return (
      <div style={{maxWidth: "500px", marginRight: "auto", marginLeft: "auto", marginTop: "170px"}}>
        <Card>
          <CardTitle title="Message" subtitle="Here is token for the browser"/>
          <CardText>
            <TextField
              floatingLabelText="Token"
              fullWidth={true}
              multiLine={true}
              value={this.state.token}
            />
          </CardText>
        </Card>
        <Snackbar
          open={this.state.toast}
          message={this.state.toastMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({toast: false})}
        />
      </div>
    );
  }
}

export default Notify;
