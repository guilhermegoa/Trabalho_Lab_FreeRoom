import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Models/Community'

export default class CommunitySeeder extends BaseSeeder {
  public async run() {
    await Community.createMany([
        { 
          name: 'Consoles & Jogos', 
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.', 
          color: '#F56565',
          image_url: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80'
        },
        { 
          name: 'PC, Hardware & Gadgets',
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.', 
          color: '#ED8936',
          image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        },
        { 
          name: 'Nintendo',
          description:'Espaço reservado à discussão sobre a Nintendo e seus consoles, Switch, Wii, Nintendo 3DS e outros.', 
          color: '#ECC94B',
          image_url: 'https://images.unsplash.com/photo-1599409333465-8b0b9e905f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        },
        { 
          name: 'Análises e dicas',
          description:'Aqui você encontra dicas e lê as análises dos últimos jogos, elaboradas pelos membros da comunidade.', 
          color: '#48BB78',
          image_url: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        },
        { 
          name: 'Desenvolvimento de jogos',
          description:'Espaço para troca de informações sobre desenvolvimento de jogos.', 
          color: 'Teal 400',
          image_url: 'https://images.unsplash.com/photo-1515524738708-327f6b0037a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        },
        { 
          name: 'Áudio e vídeo',
          description:'Discussão sobre TV, home theater e aparelhos de áudio e vídeo em geral.', 
          color: '#4299E1',
          image_url: 'https://images.unsplash.com/photo-1532436908675-8b2b1e9ca504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
        },
      ])
  }
}
