import React, { Component } from 'react';
import { Segment, Container, Grid, Header } from 'semantic-ui-react';

class Footer extends Component {
	render () {
		return (
			<Segment inverted vertical style={{ padding: '2em 0em' }}>
          <Container>
            <Grid divided inverted stackable centered>
              <Grid.Row textAlign="center">
              	<Grid.Column as="a" href="https://newsapi.org/" textAlign="center">
	              	<Header as="h3" color="blue">Powered By NewsAPI</Header>
	              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
			)
	}
}


export default Footer;