import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider} from 'material-ui/styles';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import Async from 'react-code-splitting'

const Home = () => <Async load={import("./Home")} />
const Notify = () => <Async load={import('./Notify')} />

class SidebarDrawer extends React.Component {
  componentDidMount() {
    let frameCount = 0;
    const open = () => (frameCount++ > 0) ? this.props.onMounted() :
      requestAnimationFrame(open);
    requestAnimationFrame(open);
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
      >
        <MenuItem
          primaryText={'Home'}
          containerElement={<Link to={'/'}/>}
          onClick={this.props.onClick}
        />
        <MenuItem
          primaryText={'Notification'}
          containerElement={<Link to={'/notification'}/>}
          onClick={this.props.onClick}
        />
      </Drawer>
    );
  }
}

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      drawer : false
    };
  }

  handleDrawerToggle = (e) => {
    if (!this.state.drawer) {
      this.setState({drawer: true});
      e.preventDefault();
    } else {
      this.setState({open: !this.state.open});
    }
  }

  render() {
    const LazySidebarDrawer = this.state.drawer && (<SidebarDrawer
      open={this.state.open}
      onMounted={() => this.setState({open: true})}
      onClick={() => this.setState({open: false})}
      onRequestChange={open => this.setState({open: open})}
    />)

    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <AppBar
              style={{backgroundColor: "#37474F"}}
              title={this.props.title}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={this.handleDrawerToggle}
              />
            {LazySidebarDrawer}


            <Switch id="content">
              <Route exact path="/" component={Home}/>
              <Route path="/notification" component={Notify}/>
            </Switch>


          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
};

export default AppShell;
