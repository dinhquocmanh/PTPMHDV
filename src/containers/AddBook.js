import React, { Component } from 'react'
import { Form, Container, Button } from 'semantic-ui-react'
import { addBookURL } from '../endpoints'
import axios from "axios";

const options = [
    { key: 'a', text: 'Trinh thám', value: 'tr' },
    { key: 'b', text: 'Toán học', value: 'toan' },
    { key: 'c', text: 'Văn học', value: 'van' },
    { key: 'd', text: 'Tiểu thuyết', value: 'novel' },
]

class AddBook extends Component {
    state = {
        loading: false,
        error: null,
        formVisible: false,
        data: [],
        formData: {}
    };

    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit(e) {
        const formData = new FormData(e.target)
        const user = {}

        e.preventDefault()

        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }

        // Do what you will with the user object here
        console.log(user)
        axios
            .post(addBookURL, formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        const { value } = this.state
        return (
            <Container>
                <Form onSubmit={this.handleSubmit} style={{ margin: "5em 10em 10em", padding: "3em 0em" }}>

                    <Form.Input fluid name="name" label='Tên sách' placeholder='Tên sách' />
                    <Form.Input fluid name="author" label='Tác giả' placeholder='Tác giả' />
                    <Form.Input fluid name="nhaxuatban" label='Nhà xuất bản' placeholder='Nhà xuất bản' />
                    <Form.Input fluid name="namxuatban" label='Năm xuất bản' placeholder='Năm xuất bản' />
                    <Form.Select
                        fluid
                        label='Thể loại'
                        name="theloai"
                        options={options}
                        placeholder='Thể loại'
                    />
                    <Form.Group inline>
                        <label>Trạng thái</label>
                        <Form.Radio
                            label='Trong kho'
                            value='sm'
                            checked={value === 'sm'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Đã cho mượn'
                            value='md'
                            checked={value === 'md'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Đã mất'
                            value='lg'
                            checked={value === 'lg'}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.TextArea name="description" label='Mô tả' placeholder='Mô tả...' />
                    {/* <Button>Cancel</Button> */}
                    <Button color='green'>Thêm sách</Button>

                </Form>
            </Container>

        )
    }
}

export default AddBook
