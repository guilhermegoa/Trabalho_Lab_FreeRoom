import React, { Component } from 'react';

import { connect } from "react-redux";
import api from "../services/api"
import cloudinary from "../services/cloudinary"

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
  Textarea,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/core";

// import { Text } from "@chakra-ui/core";
import ImageUploader from 'react-images-upload'

import Loading from '../components/Loading/index'
import PostList from '../components/PostList/index'
import ButtonCreatePost from '../components/ButtonCreatePost/index'

import { fetchCommunity } from '../redux/ducks/community';

class Community extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      title: "",
      content: "",
      picture: null,
      loading: false,
      picture_name: "Nenhuma imagem escolhida"
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCommunity(this.props.match.params.id));
  }

  calculateHot(post) {
    const dateTime = new Date() - new Date(post.created_at)
    const likes = post.likes === 0 ? 1 : post.likes
    return dateTime / likes
  }

  hotPosts(posts) {
    const newPosts = [...posts]
    newPosts.sort((a, b) => this.calculateHot(a) - this.calculateHot(b));
    return newPosts
  }

  newPosts(posts) {
    const newPosts = [...posts]
    newPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return newPosts
  }

  topPosts(posts) {
    const newPosts = [...posts]
    newPosts.sort((a, b) => a.likes - b.likes);
    return newPosts
  }

  handleChangeTitle = event => this.setState({ title: event.target.value });
  handleChangeContent = event => this.setState({ content: event.target.value });

  onDrop = async picture => {
    this.setState({ loading: true })
    await this.setState({ picture, picture_name: picture[0].name })
    this.setState({ loading: false })
  }

  showModal = () =>
    this.setState({ modalVisible: true })

  hideModal = () => {
    this.setState({
      modalVisible: false,
      title: "",
      content: "",
      picture: null,
      picture_name: "Nenhuma imagem escolhida"
    })
  }

  redirectToLogin = () => this.props.history.push('/login')

  sendPost = async () => {
    this.setState({ loading: true })
    if (this.state.title && this.state.content) {

      let url = null

      if (this.state.picture) {
        const dataFile = new FormData()
        console.log('State = ', this.state)
        dataFile.append('file', this.state.picture[0])
        dataFile.append('upload_preset', 'freeroom')

        const file = await cloudinary.post(`/image/upload`, dataFile)

        url = file.data.url
      }

      const data = { title: this.state.title, content: this.state.content, image_url: url }

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
    this.setState({ loading: false })
  }

  /*<LoginBackground>
          <Text fontSize="6xl" color="#FFF" fontWeight="700">{community.name}</Text>
        </LoginBackground>*/

  render() {
    const { community } = this.props;
    return (
      community ? (<Tabs m="10px" variantColor="purple" variant="soft-rounded">
        <TabList>
          <Tab>Calientes</Tab>
          <Tab>Novos</Tab>
          <Tab>Top</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PostList posts={this.hotPosts(community.posts)}></PostList>
          </TabPanel>
          <TabPanel>
            <PostList posts={this.newPosts(community.posts)}></PostList>
          </TabPanel>
          <TabPanel>
            <PostList posts={this.topPosts(community.posts)}></PostList>
          </TabPanel>
        </TabPanels>

        <div onClick={this.props.user.isLogged ? this.showModal : this.showModal /*this.redirectToLogin*/}>
          <ButtonCreatePost ></ButtonCreatePost>
        </div>
        <Modal blockScrollOnMount={false} isOpen={this.state.modalVisible} onClose={this.hideModal}>
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Criar Post na comunidade "{community.name}"</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input value={this.state.title}
                  onChange={this.handleChangeTitle} focusBorderColor="purple.500" placeholder="Digite um título..." />
              </FormControl>

              <FormControl mt={4} mb={4} isRequired>
                <FormLabel>Conteúdo</FormLabel>
                <Textarea value={this.state.content}
                  onChange={this.handleChangeContent} focusBorderColor="purple.500" placeholder="Digite o seu texto" />
              </FormControl>

              <FormLabel>{this.state.picture_name}</FormLabel>
              <ImageUploader
                withIcon={true}
                buttonText='Escolher Imagem'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                maxFileSize={5242880}
                fileTypeError='Esse tipo de arquivo não é permitido'
                fileSizeError='Esse arquivo é muito grande'
                label='Tamanho máximo: 5mb - Arquivos: jpg | png | gif'
                singleImage={true}
              />

            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={this.hideModal}>
                Cancelar
            </Button>
              <Button variantColor="purple" isLoading={this.state.loading} onClick={this.sendPost}>Publicar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Tabs>

      )
        : <Loading></Loading>
    )
  }
}

const mapStateToProps = (state) => ({
  community: state.community[0],
  user: state.user
})


export default connect(mapStateToProps)(Community);
