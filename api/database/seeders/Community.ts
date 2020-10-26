import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Models/Community'

export default class CommunitySeeder extends BaseSeeder {
  public async run() {
    await Community.createMany([
        { 
          name: 'Consoles & Jogos', 
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.', 
          color: '#F56565',
          image_url: 'https://www.istockphoto.com/photo/gm1170073827-323659136?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_noresults&referrer_url=https%3A//pixabay.com/pt/images/search/consoles%2520%26%2520jogos/&utm_term=consoles%20%26%20jogos'
        },
        { 
          name: 'PC, Hardware & Gadgets',
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.', 
          color: '#ED8936',
          image_url: 'https://www.istockphoto.com/photo/gm1170073827-323659136?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_noresults&referrer_url=https%3A//pixabay.com/pt/images/search/consoles%2520%26%2520jogos/&utm_term=consoles%20%26%20jogos'
        },
        { 
          name: 'Nintendo',
          description:'Espaço reservado à discussão sobre a Nintendo e seus consoles, Switch, Wii, Gamecube, Gameboy, Nintendo 3DS e outros.', 
          color: '#ECC94B',
          image_url: 'https://www.istockphoto.com/photo/gm532304779-55986122?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&referrer_url=https%3A//pixabay.com/pt/images/search/nintendo/&utm_term=nintendo'
        },
        { 
          name: 'Análises e dicas',
          description:'Aqui você encontra dicas e lê as análises dos últimos jogos, elaboradas pelos membros da comunidade.', 
          color: '#48BB78',
          image_url: 'https://www.istockphoto.com/photo/gm1170073827-323659136?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_noresults&referrer_url=https%3A//pixabay.com/pt/images/search/consoles%2520%26%2520jogos/&utm_term=consoles%20%26%20jogos'
        },
        { 
          name: 'Desenvolvimento de jogos',
          description:'Espaço para troca de informações sobre desenvolvimento de jogos.', 
          color: 'Teal 400',
          image_url: 'https://www.istockphoto.com/photo/gm1170073827-323659136?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_noresults&referrer_url=https%3A//pixabay.com/pt/images/search/consoles%2520%26%2520jogos/&utm_term=consoles%20%26%20jogos'
        },
        { 
          name: 'Áudio e vídeo',
          description:'Discussão sobre TV, home theater e aparelhos de áudio e vídeo em geral.', 
          color: '#4299E1',
          image_url: 'https://www.istockphoto.com/photo/gm1178270527-329254305?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&referrer_url=https%3A//pixabay.com/pt/images/search/%25C3%2581udio%2520e%2520v%25C3%25ADdeo/&utm_term=%C3%81udio%20e%20v%C3%ADdeo'
        },
      ])
  }
}
