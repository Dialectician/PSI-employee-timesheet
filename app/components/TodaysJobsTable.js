import React from 'react';
import { Text } from 'react-native';
import { Grid, Col, Row } from 'native-base';

const TodaysJobsTable = ({ data }) => {
    return (
        <Grid style={{ alignItems: 'center' }}>
          <Row style={{ height: 30 }} >
          {/*Table Labels*/}
            <Col size={24} style={styles.tableStyle.titleFirst}>
              <Text style={{ fontWeight: 'bold' }}>Job #</Text>
            </Col>
            <Col size={28} style={styles.tableStyle.title}>
              <Text style={{ fontWeight: 'bold' }}>Client</Text>
            </Col>
            <Col size={31} style={styles.tableStyle.title}>
              <Text style={{ fontWeight: 'bold' }}>Job Title</Text>
            </Col>
            <Col size={17} style={styles.tableStyle.titleLast}>
              <Text style={{ fontWeight: 'bold' }}>Hours</Text>
            </Col>
          </Row>
          {/*Table Labels*/}
          {data.map((item, i) =>
            <Row style={{ minHeight: 50 }} key={i}>
              <Col size={24} style={styles.tableStyle.bodyFirst}>
                <Text style={styles.tableStyle.bodyText}>{item.Job_Number}</Text>
              </Col>
              <Col size={28} style={styles.tableStyle.body}>
                <Text style={styles.tableStyle.bodyText}>{item.Client_Name}</Text>
              </Col>
              <Col size={31} style={styles.tableStyle.body}>
                <Text style={styles.tableStyle.bodyText}>{item.Sub_Task}</Text>
              </Col>
              <Col size={17} style={styles.tableStyle.bodyLast}>
                <Text style={styles.tableStyle.bodyText}>{item.Hours}</Text>
              </Col>
            </Row>
          )}
        </Grid>
    );
};

const styles = {
  container: {
    flex: 1,
  },
  tableStyle: {
    titleFirst: {
      backgroundColor: '#a0a6ab',
			borderWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
    },
		title: {
			backgroundColor: '#a0a6ab',
			borderTopWidth: 1,
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		titleLast: {
			backgroundColor: '#a0a6ab',
			borderTopWidth: 1,
			borderBottomWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
    bodyFirst: {
      backgroundColor: '#fff',
      borderLeftWidth: 1,
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
    },
		body: {
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bodyLast: {
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
    bodyText: {
			fontSize: 14
		}
	}
};

export { TodaysJobsTable };
