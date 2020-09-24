import React, { Component } from 'react';

import { connect } from "react-redux";
import api from "../services/api"

// import { Text } from "@chakra-ui/core";

import Loading from '../components/Loading/index'
import PostList from '../components/PostList/index'
import ButtonCreatePost from '../components/ButtonCreatePost/index'

import { fetchCommunity } from '../redux/ducks/community'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/core";

class Community extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      title: "",
      content: "",
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCommunity(this.props.match.params.id));
  }

  handleChangeTitle = event => this.setState({ title: event.target.value });
  handleChangeContent = event => this.setState({ content: event.target.value });

  showModal = () =>
    this.setState({ modalVisible: true })

  hideModal = () => this.setState({ modalVisible: false })

  redirectToLogin = () => this.props.history.push('/login')

  sendPost = async () => {
    if (this.state.title && this.state.content) {
      const data = { title: this.state.title, content: this.state.content }
      try {
        await api.post(`/posts/1/create/${this.props.match.params.id}`, data)
        console.log(this.props)
        this.props.dispatch(fetchCommunity(this.props.match.params.id));
      } catch (error) {
        console.log(error)
      } finally {
        this.hideModal()
      }
    }
  }

  /*<LoginBackground>
          <Text fontSize="6xl" color="#FFF" fontWeight="700">{community.name}</Text>
        </LoginBackground>*/

  render() {
    const { community } = this.props
    return (
      community ? (<>
        <PostList element={community}></PostList>
        <div onClick={this.props.user.isLogged ? this.showModal : this.redirectToLogin}>
          <ButtonCreatePost ></ButtonCreatePost>
        </div>
        <Modal blockScrollOnMount={false} isOpen={this.state.modalVisible} onClose={this.hideModal}>
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Criar Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input value={this.state.title}
                  onChange={this.handleChangeTitle} focusBorderColor="purple.500" placeholder="Digite um título..." />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Conteúdo</FormLabel>
                <Textarea value={this.state.content}
                  onChange={this.handleChangeContent} focusBorderColor="purple.500" placeholder="Digite o seu texto" />
              </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={this.hideModal}>
                Cancelar
            </Button>
              <Button variantColor="purple" onClick={this.sendPost}>Publicar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

      )
        : <Loading></Loading>
    )
  }
}

const mapStateToProps = state => ({
  community: state.community[0],
  user: state.user
})

export default connect(mapStateToProps)(Community);
