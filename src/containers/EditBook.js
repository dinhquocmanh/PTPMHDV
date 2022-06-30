import React from "react";
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
import { infoBookURL } from "../endpoints";

const options = [
    { key: 'a', text: 'Trinh thám', value: 'tr' },
    { key: 'b', text: 'Toán học', value: 'toan' },
    { key: 'c', text: 'Văn học', value: 'van' },
    { key: 'd', text: 'Tiểu thuyết', value: 'novel' },
]

class EditBook extends React.Component {
    state = {
        loading: false,
        error: null,
        formVisible: false,
        data: [],
        formData: {}
    };

    componentDidMount() {
        this.handleFetchItem();
    }

    handleToggleForm = () => {
        const { formVisible } = this.state;
        this.setState({
            formVisible: !formVisible
        });
    };

    handleFetchItem = () => {
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

    handleDeleteBook = () => {
        const {
            match: { params }
        } = this.props;
        this.setState({ loading: true });
        axios
            .delete(infoBookURL(params.bookID))
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };


    render() {
        const { data, error, formData, formVisible, loading } = this.state;
        const item = data;
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

                <Form style={{ margin: "5em 10em 10em", padding: "3em 0em" }}>

                    <Form.Input fluid label='Tên sách' placeholder='Tên sách' value={item.name} />
                    <Form.Input fluid label='Tác giả' placeholder='Tác giả' value={item.author} />
                    <Form.Input fluid label='Nhà xuất bản' placeholder='Nhà xuất bản' value={item.nhaxuatban} />
                    <Form.Input fluid label='Năm xuất bản' placeholder='Năm xuất bản' value={item.namxuatban} />

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
                    <Form.TextArea label='Mô tả' placeholder='Mô tả...' value={item.description} />
                    <Button color='red' onClick={this.handleDeleteBook} >Xóa sách</Button>
                    <Button color='yellow' onClick={this.handleUpdateBook}>Sửa sách</Button>

                </Form>

            </Container>
        );
    }
}



export default withRouter(
    connect(
        null,

    )(EditBook)
);
