import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Models/Community'

export default class CommunitySeeder extends BaseSeeder {
  public async run() {
    await Community.createMany([
        { 
          name: 'Consoles & Jogos - Discussão geral', 
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.' 
        },
        { 
          name: 'PC, Hardware & Gadgets - Discussão geral',
          description:'Fale sobre Nintendos, Playstations, Xboxes, portáteis etc.' 
        },
        { 
          name: 'Nintendo',
          description:'Espaço reservado à discussão sobre a Nintendo e seus consoles, Switch, Wii, Gamecube, Gameboy, Nintendo 3DS e outros.' 
        },
        { 
          name: 'Análises e dicas',
          description:'Aqui você encontra dicas e lê as análises dos últimos jogos, elaboradas pelos membros da comunidade.' 
        },
        { 
          name: 'Desenvolvimento de jogos',
          description:'Espaço para troca de informações sobre desenvolvimento de jogos.' 
        },
        { 
          name: 'Áudio e vídeo',
          description:'Discussão sobre TV, home theater e aparelhos de áudio e vídeo em geral.' 
        },
      ])
  }
}
