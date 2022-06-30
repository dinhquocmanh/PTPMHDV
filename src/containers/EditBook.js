import React, { Component } from 'react'
import { deleteBookURL, updateBookURL, infoBookURL } from '../endpoints'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
    Button,
    Card,
    Container,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Label,
    Loader,
    Message,
    Segment,
    Select,
    Divider
} from "semantic-ui-react";

const options = [
    { key: 'a', text: 'Trinh thám', value: 'tr' },
    { key: 'b', text: 'Toán học', value: 'toan' },
    { key: 'c', text: 'Văn học', value: 'van' },
    { key: 'd', text: 'Tiểu thuyết', value: 'novel' },
]

class EditBook extends Component {
    state = {
        data: null,
        error: null,
        loading: false
    };

    componentDidMount() {
        this.handleFetchBook();
    }


    handleFetchBook = () => {
        const {
            match: { params }
        } = this.props;
        this.setState({ loading: true });
        axios
            .get(infoBookURL(params.bookID))
            .then(res => {
                this.setState({ data: res.data, loading: false });

            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    }

    handleDeleteBook = itemID => {
        axios
            .delete(deleteBookURL(itemID))
            .then(res => {
                this.handleFetchBook();
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleUpdateBook = itemID => {
        axios
            .put(updateBookURL(itemID))
            .then(res => {
                this.handleFetchBook();
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleFormatData = formData => {
        // convert {colour: 1, size: 2} to [1,2] - they're all variations
        return Object.keys(formData).map(key => {
            return formData[key];
        });
    };

    handleChange = (e, { name, value }) => {
        const { formData } = this.state;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        this.setState({ formData: updatedFormData });
    };

    render() {
        const { data, error, loading } = this.state;
        const item = data;
        console.log(data)
        return (

            < Container >

                {error && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        content={JSON.stringify(error)}
                    />
                )}
                {
                    loading && (
                        <Segment>
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                            <Image src="/images/wireframe/short-paragraph.png" />
                        </Segment>
                    )
                }

                {
                    (!loading) && (

                        <Form style={{ margin: "5em 10em 10em", padding: "3em 0em" }}>

                            <Form.Input fluid label='Tên sách' placeholder='Tên sách' value={this.state.loading} />
                            <Form.Input fluid label='Tác giả' placeholder='Tác giả' />
                            <Form.Input fluid label='Nhà xuất bản' placeholder='Nhà xuất bản' />
                            <Form.Input fluid label='Năm xuất bản' placeholder='Năm xuất bản' />
                            <Form.Select
                                fluid
                                label='Thể loại'
                                options={options}
                                placeholder='Thể loại'
                            />
                            <Form.Group inline>
                                <label>Trạng thái</label>
                                <Form.Radio
                                    label='Trong kho'
                                    value='sm'
                                />
                                <Form.Radio
                                    label='Đã cho mượn'
                                    value='md'
                                />
                                <Form.Radio
                                    label='Đã mất'
                                    value='lg'
                                />
                            </Form.Group>
                            <Form.TextArea label='Mô tả' placeholder='Mô tả...' />

                            <Button color='red'>Xóa sách</Button>
                            <Button color='yellow'>Sửa sách</Button>
                        </Form>
                    )}

            </Container >

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditBook)
);
