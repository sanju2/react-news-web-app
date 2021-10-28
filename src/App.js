import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Headlines from "./Components/Headlines";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {},
      page: "home",
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.makeHTTPRequest();
  }

  makeHTTPRequest = () => {
    var url =
      "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=4b663f3c28ca44db8df79c21cc557a40";

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          //success
          console.log(result);

          this.setState({
            result: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            result: error,
          });
        }
      );
  };

  changePage = (page) => {
    this.setState({
      page: page,
    });
  };

  render() {
    //in case user goes to home page
    if (this.state.page == "home") {
      if (this.state.isLoaded) {
        return (
          <div>
            <div className="navbar">
              <a
                className=""
                onClick={() => {
                  this.changePage("home");
                }}
              >
                Home
              </a>
              <a
                onClick={() => {
                  this.changePage("about");
                }}
              >
                About Us
              </a>
            </div>
            {this.state.result.articles.map((item, index) => {
              return (
                <Headlines
                  title={item.title}
                  description={item.description}
                  image={item.urlToImage}
                ></Headlines>
              );
            })}
          </div>
        );
      } else {
        return (
          <div>
            <div className="navbar">
              <a
                className=""
                onClick={() => {
                  this.changePage("home");
                }}
              >
                Home
              </a>
              <a
                onClick={() => {
                  this.changePage("about");
                }}
              >
                About Us
              </a>
            </div>
            <div>Loading...</div>
          </div>
        );
      }

      //this is about us page
    } else {
      return (
        <div>
          <div className="navbar">
            <a
              className=""
              onClick={() => {
                this.changePage("home");
              }}
            >
              Home
            </a>
            <a
              onClick={() => {
                this.changePage("about");
              }}
            >
              About us
            </a>
          </div>
          <div style={{ margin: "50px" }}>About us</div>
          <div style={{ margin: "50px" }}>
            Developed By Lasantha Sanjeewa(Sanju2)
          </div>
        </div>
      );
    }
  }
}

export default App;
