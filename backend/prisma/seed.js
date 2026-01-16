const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Seasons
  const season1 = await prisma.season.create({
    data: {
      title: 'Fundamentos de IA',
      description: 'Aprenda os conceitos básicos de inteligência artificial.',
      image: 'https://placehold.co/600x400/1a1a1a/FFF?text=Season+1',
      missions: {
        create: [
          { title: 'O que é IA?', description: 'Introdução à IA', order: 1 },
          { title: 'Redes Neurais', description: 'Como o cérebro do computador funciona', order: 2 },
          { title: 'Machine Learning', description: 'Ensinando máquinas a aprender', order: 3 },
          { title: 'Dados e Algoritmos', description: 'A importância dos dados', order: 4 },
          { title: 'Ética na IA', description: 'Usando IA com responsabilidade', order: 5 },
        ],
      },
    },
  });

  const season2 = await prisma.season.create({
    data: {
      title: 'Programação Criativa',
      description: 'Crie arte e música com código.',
      image: 'https://placehold.co/600x400/1a1a1a/FFF?text=Season+2',
      missions: {
        create: [
          { title: 'Arte Generativa', description: 'Criando imagens com código', order: 1 },
          { title: 'Música com IA', description: 'Compondo músicas automáticas', order: 2 },
          { title: 'Chatbots', description: 'Criando seu próprio assistente', order: 3 },
          { title: 'Jogos com IA', description: 'NPCs inteligentes', order: 4 },
          { title: 'Futuro da Criação', description: 'IA como ferramenta criativa', order: 5 },
        ],
      },
    },
  });

  const season3 = await prisma.season.create({
    data: {
      title: 'Robótica e Automação',
      description: 'Como a IA controla o mundo físico.',
      image: 'https://placehold.co/600x400/1a1a1a/FFF?text=Season+3',
      missions: {
        create: [
          { title: 'Sensores e Atuadores', description: 'Os olhos e mãos dos robôs', order: 1 },
          { title: 'Carros Autônomos', description: 'Como eles dirigem sozinhos', order: 2 },
          { title: 'Casas Inteligentes', description: 'Automatizando o lar', order: 3 },
          { title: 'Drones', description: 'IA nos céus', order: 4 },
          { title: 'O Futuro do Trabalho', description: 'Humanos e robôs juntos', order: 5 },
        ],
      },
    },
  });

  console.log({ season1, season2, season3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
