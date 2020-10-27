import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Models/Community'

export default class CommunitySeeder extends BaseSeeder {
  public async run() {
    await Community.createMany([{ name: 'Jogos', }, { name: 'Piadas' }])
  }
}
