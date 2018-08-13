import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'isomorphic-fetch';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            albums: [],
            open: false
        }
    }

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    fetch() {
        fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then(res => {
                if (res.status >= 400)
                    throw new Error('Bad response from server');
                return res.json();
            })
            .then(data => {
                const { entry } = data.feed;
                this.setState({albums: entry});
                console.log(entry);
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const { albums } = this.state;
        return (
            <Router>
                <div>
                    <h1>iTunes Top 100</h1>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Album</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Release Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {albums.map((item) => (
                                <TableRow key={item.id.attributes['im:id']}>
                                    <TableCell onClick={this.handleOpen}>
                                        <Link to={item.id.attributes['im:id']}>{item['im:name'].label}</Link>
                                        <Route path="/:id" render={props => <AlbumDetails image={item['im:image'][2].label} title={item.title.label} price={item['im:price'].label} link={item.id.label} />} />
                                    </TableCell>
                                    <TableCell>{item['im:artist'].label}</TableCell>
                                    <TableCell>{item['im:releaseDate'].attributes.label}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Router>
        )
    }
}

export default App;
