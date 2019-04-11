import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Container, Dropdown, Menu, Pagination } from 'semantic-ui-react';
import { countries } from './constants/countries';
import { categories } from './constants/categories';
import errImg from './nonews.png';
import { URL, PAGE_SIZE } from './constants/constants';
import { itemsFetchData, changeCountry, changeCategory, changePage } from './actions';
import Main from './components/Main';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchData(URL+"country="+this.props.country+"&category="
      +this.props.category+"&pageSize="+PAGE_SIZE
      +"&page="+this.props.activePage+"&apiKey=5f98a99c08c34b8ea53baa592aad5114")
  }

  componentDidUpdate(prevProps) {
    if(this.props.country!==prevProps.country
      ||this.props.category!==prevProps.category
      ||this.props.activePage!==prevProps.activePage) {
        this.props.fetchData(URL+"country="+this.props.country+"&category="
          +this.props.category+"&pageSize="+PAGE_SIZE
          +"&page="+this.props.activePage+"&apiKey=5f98a99c08c34b8ea53baa592aad5114")
    }
  }


  render() {
    if(this.props.status!=="error") {
      return (
      <div>
        <Menu fluid stackable inverted color="teal">
          <Container>
            <Menu.Item as='a' href=" " header className="title">
              News Portal
            </Menu.Item>
            <Dropdown
              className="category"
              openOnFocus
              inline item placeholder='Category'
              options={ categories } 
              onChange = {(ev, {value} ) => this.props.changeCategory(value) } 
            />
            <Dropdown
              openOnFocus
              inline item placeholder='Country' 
              value={this.props.country} options={ countries }
              onChange = {(ev, {value} ) => this.props.changeCountry(value) }
            />
          </Container>
        </Menu>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Pagination
            color="teal"
            style={{visibility:this.props.status==="loading"?'hidden':'visible'}}
            activePage={this.props.activePage}
            ellipsisItem={null}
            inverted
            totalPages={this.props.totalResults?Math.ceil(this.props.totalResults/PAGE_SIZE):2}
            onPageChange={(ev, { activePage }) => this.props.changePage(activePage) } />
        </div>
        <Main />
      </div>  
      );
    }
    else {
        return (
          <div style={{marginTop:'10px',
            display:'flex',flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'}}
          >
            <Image src={errImg} size="big" centered />
            <h1 style={{textAlign:'center'}}><br/>No News Available</h1>
          </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    totalResults: state.data.totalResults,
    country: state.country,
    category: state.category,
    activePage: state.activePage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCountry: (countryName) => dispatch(changeCountry(countryName)),
    changeCategory: (categoryName) => dispatch(changeCategory(categoryName)),
    changePage: (activePage) => dispatch(changePage(activePage)),
    fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
