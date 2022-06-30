import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
    Container,
    Dimmer,
    Image,
    Item,
    Label,
    Loader,
    Message,
    Segment,
    Icon,
    Button
} from "semantic-ui-react";
import { bookListURL } from '../endpoints'
import avatar from "../bookavatar.jpg"

class BookList extends React.Component {

    state = {
        loading: false,
        error: null,
        data: []
    };

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get(bookListURL)
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    }

    handleEditBook(id) {
        this.props.history.push(`/editbook/${id}`)
    }

    render() {
        const { data, error, loading } = this.state;
        return (

            <Container>
                {error && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        content={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src="/images/wireframe/short-paragraph.png" />
                    </Segment>
                )}

                <Item.Group divided style={{ padding: '100px 0px 0px' }}>
                    {data.map(item => {
                        return (
                            <Item key={item.id}>

                                <Item.Image src={avatar} />
                                <Item.Content>
                                    <Item.Header>
                                        {item.name}
                                    </Item.Header>
                                    <Item.Meta>
                                        <span className="author">Tác giả: {item.author}</span>
                                    </Item.Meta>
                                    <Item.Meta>
                                        <span className="nxb">NXB: {item.nhaxuatban}</span>
                                    </Item.Meta>
                                    <Item.Description>{item.description}</Item.Description>

                                </Item.Content>
                                <Item.Content>
                                    <Button
                                        primary
                                        floated="right"
                                        icon
                                        labelPosition="right"
                                        onClick={() => this.handleEditBook(item.id)}
                                    >
                                        Edit
                                        <Icon name="edit" />
                                    </Button>
                                </Item.Content>
                            </Item>
                        );
                    })
                    }
                </Item.Group >
            </Container >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch()
    };
};

export default connect(
    null,
    mapDispatchToProps
)(BookList);

