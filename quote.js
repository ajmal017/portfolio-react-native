'use strict'

import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

// var League = require('./league');


class Quote extends Component {
  constructor(props){
    super(props);

    this.state = {
      change: null,
      percentChange: null,
      symbol: null,
      ask: null,
      close: null,
      open:null,
      yrTarget:null,
      vol:null,
      avgVol:null,
      mrktCap:null,
      yield: null,
      pe: null,
      name: null,
      searchString: null,
      isLoading: false,
      gotResult: false
      name: null
    };

    //this.authorize = true;

  }


  componentDidMount(){
    this.fetchStock();
  }

  fetchStock(query){

    //var stock = 'goog';
    var url = 'https://portfolioio.herokuapp.com/api/stocks/' + query;



    fetch(url)
      .then((response) => response.json())
      .then((stock)=> {
        console.log('THIS IS THE STOCK DATA!!!!!', stock)
        this.setState({
          change: stock.Change,
          percentChange: stock.PercentChange,
          symbol: stock.symbol.toUpperCase(),
          ask: stock.Ask,
          close: stock.close,
          open:stock.open,
          yrTarget:stock.yrTarget,
          vol:stock.vol,
          avgVol:stock.avgVol,
          mrktCap:stock.marktCap,
          yield: stock.yield,
          pe: stock.pe,
          name: stock.Name,
          isLoading: false
        })
      })
      .done();
  }

  onSearchTextChanged(event){
    this.setState({searchString: event.nativeEvent.text})
  }

  _executeQuery(query) {
    this.setState({ isLoading: true });
  }

  onSearchPressed() {
    var query = this.fetchStock(this.state.searchString)
    this._executeQuery(query);


  pressRow(rowData){
    console.log(rowData);
    // add rest of code to access each league
    // var league = rowData;

    // this.props.navigator.push({
    //   title: "League",
    //   component: LeagueView,
    //   passProps: {league: leagueId}
    // });
  }


  render(){


    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);


    return (
      <View style={styles.container}>
        <Text style={styles.description}>Get Quote</Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='enter symbol'/>
          <TouchableHighlight
              style={styles.button}
              onPress={this.onSearchPressed.bind(this)}
              underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>

          {spinner}
        <View>
          <Text style={styles.stockName}>{this.state.name}</Text>
          <Text style={styles.stockSymbol}>{this.state.symbol}</Text>
          <Text style={styles.stockAsk}>Ask Price: {this.state.ask}</Text>
          <Text style={styles.stockAsk}>Price Change: {this.state.change}</Text>
          <Text style={styles.stockAsk}>Percent Change: {this.state.percentChange}</Text>


          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  stockName: {
    color: '#000',
    fontSize: 35,
    flex: 1,
    padding: 10
  },
  stockSymbol: {
    color: '#000',
    fontSize: 25,
    flex: 1,
    padding: 10
  },
  stockAsk: {
    color: '#000',
    fontSize: 16,
    flex: 1,
    padding: 2
  }
});

module.exports = Quote;