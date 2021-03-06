import React, { Component } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { Container, Content, Button, Text, Grid, Header, Body, Title, View, Spinner } from 'native-base';
import moment from 'moment';

// MobX
import { observer } from 'mobx-react/native';
import todaysJobStore from '../stores/TodaysJobStore';
import recentJobStore from '../stores/RecentJobStore';

// Import table component
import { TodaysJobsTable } from '../components/TodaysJobsTable';

// Variable that is half the height of the screen
const midscreen = Dimensions.get('window').height / 4;

@observer
export default class TodaysCharges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    todaysJobStore.fetchTodaysJobs();
    this.setState({ refreshing: false });
  }

  render() {
    const { navigate } = this.props.navigation;

      if ((recentJobStore.recentJobs === null) || (todaysJobStore.todaysJobs == null) || (todaysJobStore.loading)) {
        return (
          <View style={styles.centerContainter}>
            <Spinner size='large' />
            <Text style={{ marginTop: -7, color: '#0BD318' }}>LOADING</Text>
          </View>
        );
      }

    return (
      <Container>

          <Header
            style={styles.headerStyle}
          >
            <Body>
              <Title style={styles.headerTextStyle}>Todays Charges</Title>
            </Body>
          </Header>

          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            {/*Pull Down to Refresh*/}
            <View style={{ paddingTop: 20, paddingHorizontal: 5 }}>
              <Grid style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: global.SMALL_TEXT, textAlign: 'center' }}>
                  Pull to Refresh
                </Text>
              </Grid>
            </View>

            {/*Heading*/}
            <View style={{ paddingVertical: 30, paddingHorizontal: 5 }}>
              <Grid style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: global.LARGE_TEXT, textAlign: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: global.LARGE_TEXT }}>Charges for Today:</Text> {moment().format('dddd, MMMM D, YYYY')}
                </Text>
              </Grid>
            </View>

            {/*If error*/}
  					{(todaysJobStore.errorMessage) &&
  						<Grid style={{ justifyContent: 'center', padding: 10, marginTop: 20 }}>
  			        <Text style={{ fontWeight: 'bold', fontSize: global.MEDIUM_TEXT, color: 'red' }}>{todaysJobStore.errorMessage}</Text>
  			      </Grid>
  					}

  					{/*If No Recent Jobs*/}
  					{(todaysJobStore.isEmpty) &&
              <View style={styles.centerContainter}>
    						<Grid style={{ justifyContent: 'center', marginTop: midscreen }}>
    			        <Text style={{ fontWeight: 'bold', fontSize: global.LARGE_TEXT }}> You have no charges for today!</Text>
    			      </Grid>
              </View>
  					}

  					{/*Start TodaysJobs Table*/}
  					{(!todaysJobStore.isEmpty) &&
  						<TodaysJobsTable />
  					}
  					{/*End of Table*/}

            {/*Directions*/}
            {(!todaysJobStore.isEmpty) &&
              <View style={{ paddingTop: 60, marginBottom: (!todaysJobStore.hasUncommitted) ? 30 : 0 }}>
                <Grid style={{ justifyContent: 'center' }} >
                    <Text style={{ color: 'steelblue', fontSize: global.MEDIUM_TEXT, textAlign: 'center' }}>Tap on the 'Hours' column to make changes.</Text>
                </Grid>
                <Grid style={{ justifyContent: 'center' }} >
                    <Text style={{ color: 'steelblue', fontSize: global.MEDIUM_TEXT, textAlign: 'center' }}>Hint: Type '0' to delete charge.</Text>
                </Grid>
              </View>
  					}

            {/*Button: "Update Charges"*/}
            {(!todaysJobStore.isEmpty && todaysJobStore.hasUncommitted) &&
              <View style={{ marginTop: 60, marginBottom: 60 }}>
                {(todaysJobStore.hasUncommitted) &&
                    <Text style={{ color: 'red', fontSize: global.MEDIUM_TEXT, textAlign: 'center', marginBottom: 10 }}>Rows in PINK are uncommitted. Click 'Update Charges' to commit.</Text>
                }
                <Button
                   block
                   onPress={() => todaysJobStore.updateEntry(navigate)}
                   style={styles.updateChargeButton}
                >
                   <Text style={{ fontSize: global.MEDIUM_TEXT }}>Update Charges</Text>
                 </Button>
              </View>
  			    }


            {/* FOR DEBUGGING */}
            {/* Shows size of table (for DEBUGGING)
            <Text>Size: {todaysJobStore.size}</Text>

            {(todaysJobStore.hasUncommitted) &&
              <Text>Has Uncommitted: true</Text>
            }
            {(!todaysJobStore.hasUncommitted) &&
              <Text>Has Uncommitted: false</Text>
            }
            { FOR DEBUGGING */}


          </Content>
      </Container>
    );
  }
}

const styles = {
    headerStyle: {
  		backgroundColor: 'red'
  	},
  	headerTextStyle: {
  		color: '#FFF'
  	},
    updateChargeButton: {
      backgroundColor: '#007aff',
      marginHorizontal: 20,
  		shadowColor: '#000',
  		shadowOffset: { width: 0, height: 2 },
  		shadowOpacity: 0.3,
  		shadowRadius: 2
    },
    centerContainter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  	},
};
