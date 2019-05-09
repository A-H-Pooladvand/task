import React, { Component } from 'react'
import { news } from './data'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import FormGroup from 'reactstrap/es/FormGroup'
import Input from 'reactstrap/es/Input'

let lastId = 0

class News extends Component {
  state = {
    news: news,
    modal: false,
    temp: {
      'id': null,
      'title': null,
      'links': [],
      'request': null
    }
  }
  toggle = () => {
    this.setState(prevState => ( {
      modal: !prevState.modal
    } ))
  }

  decreaseRequest = (id) => {
    const news = this.state.news
    const index = news.findIndex((item) => item.id === id)
    if (index > -1) {
      news[ index ].request -= 1
    }
    this.setState({ news :news})

    /*const items = news.map((item) => {
      if (item.id === id) {
        item.request -= 1
      }
      return item
    })
    this.setState({news:items})*/
  }

  showNews = () => {
    return this.state.news.map((item) => {
      lastId = item.id

      return (
        <tr key={ item.id }>
          <th scope="row">
            <span>{ item.id }</span>
          </th>
          <td onClick={ () => this.decreaseRequest(item.id) }>
            { item.title }
          </td>
          <td>
            { item.links }
          </td>
          <td>
            { item.request }
          </td>
        </tr>
      )
    })
  }

  addRow = () => {
    const { temp } = this.state
    this.setState({ news: [ ...this.state.news, { ...temp, id: lastId + 1 } ] }, () => console.log(this.state.news))
    this.toggle()

  }

  getValue = (e) => {
    this.setState({ temp: { ...this.state.temp, [ e.target.name ]: e.target.value } })
  }

  render () {
    return (
      <div>

        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">عنوان خبرگذاری</th>
            <th scope="col">لینک ها</th>
            <th scope="col">تعداد درخواست</th>
          </tr>
          </thead>
          <tbody>
          { this.showNews() }
          </tbody>
        </table>

        <div>
          <Button color="danger" onClick={ this.toggle }>افزودن خبرگذاری جدید</Button>
          <Modal isOpen={ this.state.modal } toggle={ this.toggle } className={ this.props.className }>
            <ModalHeader toggle={ this.toggle }>درج خبرگذاری جدید</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input name='title' onChange={ this.getValue } placeholder="عنوان خبرگذاری جدید را وارد نمایید"/>
              </FormGroup>
              <FormGroup>
                <Input name="links" onChange={ this.getValue } placeholder="لینک ها"/>
              </FormGroup>
              <FormGroup>
                <Input name="request" onChange={ this.getValue } placeholder="تعداد درخواست"/>
              </FormGroup>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={ this.addRow }>درج</Button>{ ' ' }
              <Button className='mr-3' color="danger" onClick={ this.toggle }>انصراف</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
    )
  }
}

export default News